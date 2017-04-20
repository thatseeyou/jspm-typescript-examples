// excerpt from http://reactivex.io/learnrx/

//import * as Rx from 'rxjs';

import { Observable } from 'rxjs/Observable';
//import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/map';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/scan';

import { buttonForTest, inputForTest } from './helper';

export function ex5() {
    var newReleases = [
        {
            "id": 70111470,
            "title": "Die Hard",
            "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [4.0],
            "bookmark": []
        },
        {
            "id": 654356453,
            "title": "Bad Boys",
            "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id: 432534, time: 65876586 }]
        },
        {
            "id": 65432445,
            "title": "The Chamber",
            "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [4.0],
            "bookmark": []
        },
        {
            "id": 675465,
            "title": "Fracture",
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id: 432534, time: 65876586 }]
        }
    ];

    let list = Observable.from(newReleases)
        .map((video) => {
            console.log(`> map called`);
            return {
                id: video.id,
                title: video.title
            };
        });

    console.log('BEFORE forEach');

    list.forEach((video) => {
        console.log(`Output1: ${video.id}, ${video.title}`);
    });

    console.log('BEFORE PUSH');

    // array changed
    //newReleases.length -= 1;
    newReleases.push({
        "id": 675466,
        "title": "NEW",
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
        "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
        "rating": [5.0],
        "bookmark": [{ id: 432534, time: 65876586 }]
    });

    list.forEach((video) => {
        console.log(`Output2: ${video.id}, ${video.title}`);
    });
}

export function ex8() {
    var newReleases = [
        {
            "id": 70111470,
            "title": "Die Hard",
            "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
        },
        {
            "id": 654356453,
            "title": "Bad Boys",
            "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{ id: 432534, time: 65876586 }]
        },
        {
            "id": 65432445,
            "title": "The Chamber",
            "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
        },
        {
            "id": 675465,
            "title": "Fracture",
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{ id: 432534, time: 65876586 }]
        }
    ];

    let filtered = Observable.from(newReleases)
        .filter(function (video) {
            console.log(`2. > filter (rating = ${video.rating}) called`);
            return video.rating === 5.0;
        })
        .map(function (video) {
            console.log(`3. > map called`);
            return video.id;
        });

    console.log(`1. Start forEach`);
    filtered.forEach((id) => {
        console.log(`4. Output2: ${id}`);
    });
}

export function ex12() {
    var movieLists = [
        {
            name: "Instant Queue",
            videos: [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "New Releases",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ];

    let list = Observable.from(movieLists)
        .map(function (movieList) {
            console.log(`2. > map(movieList) called`);
            let ob1 = Observable.from(movieList.videos)
                .map(function (video) {
                    console.log(`4. > map(video) called`);
                    let ob2 = Observable.from(video.boxarts)
                    // return video.boxarts
                        .filter(function (boxart) {
                            console.log(`6. > filter(width = ${boxart.width}) called`);
                            return boxart.width === 150;
                        })
                        .map(function (boxart) {
                            console.log(`7. > map(boxart) called`);
                            return { id: video.id, title: video.title, boxart: boxart.url };
                        });
                    console.log(`5. < map(video) returned`);
                    return ob2;
                })
                .concatAll();
            console.log(`3. < map(movieList) returned`);
            return ob1;
        })
        .concatAll();

    console.log(`1. Start forEach`);
    list.forEach((item) => {
        console.log(`8. Output: ${item.id}, ${item.title}, ...`);
    });
}

export function ex14() {
    var movieLists = [
        {
            name: "Instant Queue",
            videos: [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "New Releases",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ];

    let list = Observable.from(movieLists)
        .concatMap(function (movieList) {
            console.log(`2. > map(movieList) called`);
            let ob1 = Observable.from(movieList.videos)
                .concatMap(function (video) {
                    console.log(`4. > map(video) called`);
                    let ob2 = Observable.from(video.boxarts)
                    // return video.boxarts
                        .filter(function (boxart) {
                            console.log(`6. > filter(width = ${boxart.width}) called`);
                            return boxart.width === 150;
                        })
                        .map(function (boxart) {
                            console.log(`7. > map(boxart) called`);
                            return { id: video.id, title: video.title, boxart: boxart.url };
                        });
                    console.log(`5. < map(video) returned`);
                    return ob2;
                });
            console.log(`3. < map(movieList) returned`);
            return ob1;
        });

    console.log(`1. Start forEach`);
    list.forEach((item) => {
        console.log(`8. Output: ${item.id}, ${item.title}, ...`);
    });
}

export function ex17() {
	var ratings = [2,3,1,4,5];

	// You should return an array containing only the largest rating. Remember that reduce always
	// returns an array with one item.
	let sorted = Observable.from(ratings)
    .reduce(function(acc, cur) {
      // min
      if (acc.min > cur) {
        acc.min = cur;
      }
      // max
      if (acc.max < cur) {
        acc.max = cur;
      }

      return acc;
    }, { min: 1000, max: -1 });// Complete this expression

    sorted.forEach((value) => {
        console.log(`min=${value.min}, max=${value.max}`);

    });
}

export function ex20() {
    var movieLists = [
        {
            name: "New Releases",
            videos: [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 140, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "Thrillers",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 130, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 120, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ];


    // Use one or more concatMap, map, and reduce calls to create an array with the following items (order doesn't matter)
    // [
    //     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
    //     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
    //     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" },
    //     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
    // ];

    let list = Observable.from(movieLists)
        .concatMap(function (movieList) {
            console.log(`2. > concatMap(movieList) called`);
            let ob1 = Observable.from(movieList.videos)
                .concatMap(function (video) {
                    console.log(`4. > concatMap(video) called`);
                    let ob2 = Observable.from(video.boxarts)
                        .reduce(function (acc, curr) {
                            console.log(`6. > reduce called`);
                            if (acc.width * acc.height < curr.width * curr.height) {
                                return acc;
                            }
                            else {
                                return curr;
                            }
                        })
                        .map(function (boxart) {
                            console.log(`7. > map(boxart) called`);
                            return { id: video.id, title: video.title, boxart: boxart.url };
                        });
                    console.log(`5. > concatMap(video) returned`);
                    return ob2;
                });
            console.log(`3. < concatMap(movieList) returned`);
            return ob1;
        });

    console.log(`1. Start forEach`);
    list.forEach((item) => {
        console.log(`8. Output: ${item.id}, ${item.title}, ...`);
    });
}

export function ex24() {
    var movieLists = [
        {
            name: "New Releases",
            videos: [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "interestingMoments": [
                        { type: "End", time: 213432 },
                        { type: "Start", time: 64534 },
                        { type: "Middle", time: 323133 }
                    ]
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 140, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg" }

                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "interestingMoments": [
                        { type: "End", time: 54654754 },
                        { type: "Start", time: 43524243 },
                        { type: "Middle", time: 6575665 }
                    ]
                }
            ]
        },
        {
            name: "Instant Queue",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 130, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "interestingMoments": [
                        { type: "End", time: 132423 },
                        { type: "Start", time: 54637425 },
                        { type: "Middle", time: 3452343 }
                    ]
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 120, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "interestingMoments": [
                        { type: "End", time: 45632456 },
                        { type: "Start", time: 234534 },
                        { type: "Middle", time: 3453434 }
                    ]
                }
            ]
        }
    ];

    //------------ COMPLETE THIS EXPRESSION --------------
    let list = Observable.from(movieLists)
        .concatMap(function (movieList) {
            console.log(`2. > concatMap(movieList) called`);
            let ob0 = Observable.from(movieList.videos)
                .concatMap(function (video) {
                    console.log(`4. > concatMap(video) called`);
                    var boxarts = Observable.from(video.boxarts)
                        .reduce(function (last, cur) {
                            console.log(`6. > reduce() called`);
                            return last.width > cur.width ? cur : last;
                        });
                    var interestingMoments = Observable.from(video.interestingMoments)
                        .filter(function (interestingMoment) {
                            console.log(`7. > filter(interestingMoment) called`);
                            return interestingMoment.type == 'Middle';
                        });
                    let ob1 = Observable.zip(boxarts, interestingMoments, function (boxart, interestingMoment) {
                        console.log(`8. > zip() called`);
                        return { id: video.id, title: video.title, time: interestingMoment.time, url: boxart.url };
                    });
                    console.log(`5. < concatMap(video) return`);
                    return ob1;
                });
            console.log(`3. < concatMap(movieList) return`);
            return ob0;
        });

    console.log(`1. START forEach`);
    list.forEach((item) => {
        console.log(`9. id=${item.id}, title=${item.title}, time=${item.time}`);
    });
}

export function ex29(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('for ex29: click this', placeholder);

	var buttonClicks = Observable.fromEvent<MouseEvent>(button, 'click');

	// In the case of an Observable, forEach returns a subscription object.
    var subscription = buttonClicks
        .subscribe(function (clickEvent) {
            console.log('Button was clicked. Stopping Traversal.');

            // Stop traversing the button clicks
            subscription.unsubscribe();
        });
}

export function ex30(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('for ex30: click this', placeholder);

    var buttonClicks = Observable.fromEvent<MouseEvent>(button, 'click');

    // Use take() to listen for only one button click
    // and unsubscribe.
    buttonClicks.take(1)
        // Insert take() call here
        .forEach((clickEvent) => {
            console.log('Button was clicked once. Stopping Traversal.');
        });
}

export function ex33(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let sprite = buttonForTest('for ex33: drag this', placeholder);
    sprite.style.position = 'absolute';
    let spriteContainer = document.body;

	let spriteMouseDowns = Observable.fromEvent<MouseEvent>(sprite, "mousedown"),
		spriteContainerMouseMoves = Observable.fromEvent<MouseEvent>(spriteContainer, "mousemove"),
		spriteContainerMouseUps = Observable.fromEvent<MouseEvent>(spriteContainer, "mouseup"),
		spriteMouseDrags = spriteMouseDowns
            .concatMap(function (contactPoint) {
                console.log('2. > concatMap(contactPoint) called');
                // ...retrieve all the mouse move events on the sprite container...
                let dragPoint = spriteContainerMouseMoves
                    // ...until a mouse up event occurs.
                    .takeUntil(spriteContainerMouseUps)
                    .map(function (movePoint) {
                        console.log('4. > map(movePoint) called');
                        return {
                            pageX: movePoint.pageX - contactPoint.layerX,
                            pageY: movePoint.pageY - contactPoint.layerY
                        };
                    });
                console.log('3. < concatMap(contactPoint) returned');
                return dragPoint;
            });

    console.log('> 1. Start forEach');
	// For each mouse drag event, move the sprite to the absolute page position.
	spriteMouseDrags.forEach(function(dragPoint) {
        console.log('5. > forEach(dragPoint) called');
		sprite.style.left = dragPoint.pageX + "px";
		sprite.style.top = dragPoint.pageY + "px";
	});
}

export function ex38(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let button = buttonForTest('for ex38: click this', placeholder);
    let buttonClicks = Observable.fromEvent<MouseEvent>(button, 'click');

	let clicks = buttonClicks.throttleTime(1000);

    clicks.forEach(function(click) {
        console.log(`time: ${click.timeStamp} - ${new Date(click.timeStamp)}`);
    });
}

export function ex40(testButton:HTMLButtonElement, placeholder:HTMLElement) {
    let input = inputForTest('for ex40', placeholder);
    let keyPresses = Observable.fromEvent<KeyboardEvent>(input, 'keypress');

	let strings = keyPresses
		.map((keyboardEvent) => { 
            console.log(`2. > map(${keyboardEvent.key}) called`);
            return keyboardEvent.key;
        })
		.filter((character) => { 
            console.log(`3. > filter(${character}) called`);
            return /^[A-Za-z]$/.test(character); 
        })
		.distinctUntilChanged()
		.scan((stringSoFar, character) => {
            console.log(`4. > scan(${stringSoFar}, ${character}) called`);
			return stringSoFar + character;
		}, '');

    console.log(`1. Start forEach`);
    strings.forEach((string) => {
        console.log(`5. ${string}`);
    });
}


