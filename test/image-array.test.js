import { expect } from 'chai';
import ThreeSixty from '../src/threesixty.js';

describe('Array of images', function () {
  before(function () {
    this.container = document.getElementById('threesixty');
    this.images = [
      'images/example-1.jpg',
      'images/example-2.jpg',
      'images/example-3.jpg',
      'images/example-4.jpg',
    ];
    this.threesixty = new ThreeSixty(document.getElementById('threesixty'), {
      image: this.images,
      width: 320,
      height: 320,
    });
  });

  it('should be in sprite mode when single image is provided', function () {
     expect(this.threesixty.sprite).to.be.equal(false);
  });

  it('should update image when navigation is used', function () {
    expect(this.container.style.backgroundImage).to.be.equal(`url(${this.images[0]})`);

    this.threesixty.next();
    this.threesixty.next();
    this.threesixty.next();

    expect(this.container.style.backgroundImage).to.be.equal(`url(${this.images[3]})`);

    this.threesixty.prev();
    this.threesixty.prev();

    expect(this.container.style.backgroundImage).to.be.equal(`url(${this.images[1]})`);
  });

  it('should correctly update image when goto is used', function () {
    this.threesixty.goto(0);

    expect(this.container.style.backgroundImage).to.be.equal(`url(${this.images[0]})`);

    this.threesixty.goto(2);

    expect(this.container.style.backgroundImage).to.be.equal(`url(${this.images[2]})`);

    this.threesixty.goto(-1);

    expect(this.container.style.backgroundImage).to.be.equal(`url(${this.images[3]})`);

    this.threesixty.goto(6);

    expect(this.container.style.backgroundImage).to.be.equal(`url(${this.images[2]})`);
  });
});
