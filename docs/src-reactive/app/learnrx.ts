// excerpt from http://reactivex.io/learnrx/

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/reduce';

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
        })

    list.forEach((video) => {
        console.log(`Output1: ${video.id}, ${video.title}`);
    });

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
            console.log(`> filter (rating = ${video.rating}) called`);
            return video.rating === 5.0;
        })
        .map(function (video) {
            console.log(`> map called`);
            return video.id;
        });

    filtered.forEach((id) => {
        console.log(`Output2: ${id}`);
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
            console.log(`> map(movieList) called`);
            return Observable.from(movieList.videos)
                .map(function (video) {
                    console.log(`> map(video) called`);
                    return Observable.from(video.boxarts)
                    // return video.boxarts
                        .filter(function (boxart) {
                            console.log(`> filter(width = ${boxart.width}) called`);
                            return boxart.width === 150;
                        })
                        .map(function (boxart) {
                            console.log(`> map(boxart) called`);
                            return { id: video.id, title: video.title, boxart: boxart.url };
                        });
                })
                .concatAll();
        })
        .concatAll();

    list.forEach((item) => {
        console.log(`Output: ${item.id}, ${item.title}, ...`);
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
            console.log(`> map(movieList) called`);
            return Observable.from(movieList.videos)
                .concatMap(function (video) {
                    console.log(`> map(video) called`);
                    return Observable.from(video.boxarts)
                    // return video.boxarts
                        .filter(function (boxart) {
                            console.log(`> filter(width = ${boxart.width}) called`);
                            return boxart.width === 150;
                        })
                        .map(function (boxart) {
                            console.log(`> map(boxart) called`);
                            return { id: video.id, title: video.title, boxart: boxart.url };
                        });
                });
        });

    list.forEach((item) => {
        console.log(`Output: ${item.id}, ${item.title}, ...`);
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
            return Observable.from(movieList.videos)
                .concatMap(function (video) {
                    return Observable.from(video.boxarts)
                        .reduce(function (acc, curr) {
                            console.log(`> reduce called`);
                            if (acc.width * acc.height < curr.width * curr.height) {
                                return acc;
                            }
                            else {
                                return curr;
                            }
                        }).
                        map(function (boxart) {
                            console.log(`> map(boxart) called`);
                            return { id: video.id, title: video.title, boxart: boxart.url };
                        });
                });
        });

    list.forEach((item) => {
        console.log(`Output: ${item.id}, ${item.title}, ...`);
    });
}


