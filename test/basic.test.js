import { expect } from 'chai';
import ThreeSixty from '../src/threesixty.js';

describe('Basic Features', function () {
  before(function () {
    this.container = document.getElementById('threesixty');
    this.image = 'https://s3.eu-central-1.amazonaws.com/threesixty.js/watch.jpg';
    this.threesixty = new ThreeSixty(document.getElementById('threesixty'), {
      image: this.image,
      width: 320,
      height: 320,
      count: 31,
      perRow: 4
    });
  });

  it('should set container properties', function () {
    expect(this.container.style.backgroundImage).to.be.equal(`url(${this.image})`);
    expect(this.container.style.backgroundSize).to.be.equal('400% 800%');
    expect(this.container.style.backgroundPositionX).to.be.equal('0px');
    expect(this.container.style.backgroundPositionY).to.be.equal('0px');
  });

  it('should be in sprite mode when single image is provided', function () {
     expect(this.threesixty.sprite).to.be.equal(true);
  });

  it('should update current index when navigation is used', function () {
    expect(this.threesixty.index).to.be.equal(0);

    this.threesixty.next();
    this.threesixty.next();
    this.threesixty.next();

    expect(this.threesixty.index).to.be.equal(3);

    this.threesixty.prev();
    this.threesixty.prev();

    expect(this.threesixty.index).to.be.equal(1);
  });

  it('should correctly update current index when goto is used', function () {
    this.threesixty.goto(0);

    expect(this.threesixty.index).to.be.equal(0);

    this.threesixty.goto(4);

    expect(this.threesixty.index).to.be.equal(4);

    this.threesixty.goto(-1);

    expect(this.threesixty.index).to.be.equal(30);

    this.threesixty.goto(34);

    expect(this.threesixty.index).to.be.equal(3);
  });

  it('should update looping status when played/stopped', function () {
    expect(this.threesixty.looping).to.be.equal(false);

    this.threesixty.play();

    expect(this.threesixty.looping).to.be.equal(true);

    this.threesixty.stop();

    expect(this.threesixty.looping).to.be.equal(false);
  });

  it('should update looping status when toggled', function () {
    expect(this.threesixty.looping).to.be.equal(false);

    this.threesixty.toggle();

    expect(this.threesixty.looping).to.be.equal(true);

    this.threesixty.toggle();

    expect(this.threesixty.looping).to.be.equal(false);
  });

  it('should clean up container properties after destroy', function () {
    this.threesixty.destroy();

    expect(this.container.style.backgroundImage).to.be.equal('');
    expect(this.container.style.backgroundSize).to.be.equal('');
    expect(this.container.style.backgroundPositionX).to.be.equal('');
    expect(this.container.style.backgroundPositionY).to.be.equal('');
  });
});
