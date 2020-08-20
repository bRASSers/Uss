import Snake from "./snake.js";
import {createHighscoreHtml} from './snake.js';

const describe = window.describe;
const it = window.it;
const fc = window.fastcheck;
const chai = window.chai;
var assert = chai.assert;

describe("Mocha", function () {
    it("Correctly initialises Mocha", function () {
    });
    it("Correctly initialises FastCheck", function () {
        fc.assert(fc.property(fc.integer(), () => true));
    });
});

const badRequest = {
    highscore: 23
};

describe("Express routing tests", function() {

    it("POST /scores/ tests", function() {

        fetch("/scores", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(badRequest),
          })
            .then((response) => response.json())
            .then(data => console.log(data));
    });

});

describe("Example based testing", function () {

    it("Eating food", function () {
        const start = Snake.tail[1];
        const eat = Snake.eat(start);
        const expected = Snake.tail[1, 1]

        chai.expect(eat).to.deep.equal(expected);
    });




});

describe("Highscore HTML creator test", function () {

    const data = [
        {
            highscore: 10
        },
        {
            highscore: 12
        },
        {
            highscore: 14
        },
        {
            highscore: 16
        },
        {
            highscore: 9
        },
        {
            highscore: 8
        }
    ];

    const expectedData = "<ul><li>10</li><li>12</li><li>14</li><li>16</li><li>9</li><li>8</li></ul>";

    const result = createHighscoreHtml(data)

    it("returns the correct HTML sequence", function () {
        
        assert.equal(result.outerHTML,expectedData);
    });

    it("returns the correct instance", function () {
        assert.instanceOf(result,Element);
    });


});