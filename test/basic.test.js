const expect = require('chai').expect;
const ThreeSixty = require('../dist/threesixty');

describe('Basic Features', () => {
  before(() => {
    this.container = document.getElementById('threesixty');
    this.threesixty = new ThreeSixty(document.getElementById('threesixty'), {
        image: 'https://s3.eu-central-1.amazonaws.com/threesixty.js/watch.jpg',
        width: 320,
        height: 320,
        count: 31,
        perRow: 4
    });
  });

  it('should set container properties', () => {
    expect(this.container.style.backgroundImage).to.be.equal('url(https://s3.eu-central-1.amazonaws.com/threesixty.js/watch.jpg)');
    expect(this.container.style.backgroundSize).to.be.equal('400%');
  });

  it('should be in sprite mode when single image is provided', () => {
     expect(this.threesixty.sprite).to.be.equal(true);
  });

  it('should update current index when navigation is used', () => {
    expect(this.threesixty.index).to.be.equal(0);

    this.threesixty.next();
    this.threesixty.next();
    this.threesixty.next();

    expect(this.threesixty.index).to.be.equal(3);

    this.threesixty.prev();
    this.threesixty.prev();

    expect(this.threesixty.index).to.be.equal(1);
  });

  it('should update looping status when played/stopped', () => {
    expect(this.threesixty.looping).to.be.equal(false);

    this.threesixty.play();

    expect(this.threesixty.looping).to.be.equal(true);

    this.threesixty.stop();

    expect(this.threesixty.looping).to.be.equal(false);
  });
});
