import * as showdown from 'showdown';

function convert(placeholder:HTMLElement, markdown:string) {
    let converter = new showdown.Converter();
    let html = converter.makeHtml(markdown);

    let markdownContainer = placeholder.appendChild(document.createElement('pre'));
    let htmlContainer = placeholder.appendChild(document.createElement('pre'));
    let renderContainer = placeholder.appendChild(document.createElement('div'));
    markdownContainer.innerText = markdown;
    htmlContainer.innerText = html;
    renderContainer.innerHTML = html;
}

export function test1(targetButton:HTMLButtonElement, placeholder:HTMLElement) {
    let markdown = '#hello, markdown!';

    convert(placeholder, markdown);
}

export function test2(targetButton:HTMLButtonElement, placeholder:HTMLElement) {
    let markdown = `## 개요
* 제목 : TypeScript
* 목표 : TypeScript를 이용해서 웹 프로그래밍을 할 수 있다. 웹 개발자라면 알아야 하는 필수 지식이 되었다.

----
## 상세 설명
TypeScript는 컴파일 과정을 통해서 자바스크립트 코드를 생성하지만 새로운 언어가 아니라 자바스크립트를 확장하는 방식으로 구현되어 있어서 CoffeeScript 처럼 새로운 문법을 익히지 않아도 된다.

다음의 특징을 갖고 있다.

* 정적 타입 지원 : 모든 변수에 number, string, interface와 같은 타입을 지정할 수 있다. TypeScript를 지원하는 Visual Studio Code와 같은 편집기는 컴파일 타임에 타입을 점검하여 사전에 상당한 오류를 잡아낸다. 런타임에 "이런 속성 없습니다"와 같은 대부분의 오류를 사전에 찾아낼 수 있게 한다. 

* ES6와 같은 최신 기능 : 최근의 자바스크립는 ES2015, ES2016 등과 같이 매우 빨리 발전을 하고 있다. 최신의 기능을 사용하고 싶어도 브라우저 호환성 때문에 사용을 꺼리게 된다. TypeScript는 최신의 기능을 사용하더라도 ES3, ES5와 호환되는 코드로 변환을 해 주기 때문에 걱정없이 최신 기능을 사용할 수 있다. Babel이 제공하는 기능과 유사하다.

* Visual Studio Code와 같은 최신 도구의 지원 : Visual Studio, Xcode, Eclipse 등에서 C++, Swift, Java 을 사용할 때 누렸던 코드 자동 완성, 안전한 리팩토링 등의 이점을 자바스크립트에서도 활용할 수 있게 되었다. 이제 더 이상 인자로 넘겨주어야 할 오브젝트의 형태 파악에 시간을 쓰지 않아도 된다.  

* 성숙도 : Angular, Ionic과 같은 프레임워크는 TypeScript로 작성이 되어 있으며 유명 자바스크립트 라이브러리도 TypeScript에서 사용할 수 있도록 선언(C에서 헤더파일과 유사)파일을 제공하고 있다.

TypeScript는 MS에서 개발을 했으며 이미 다양한 오픈소스에서 채택되어 활용되고 있다. 구글도 얼마전에 사내에서 사용하는 주요 언어로 TypeScript를 지정했다.

자바스크립트의 활용도는 단순 웹을 넘어서 서버, 앱의 영역까지 확장되어 가고 있으며 TypeScript는 자바스크립트 프로그래밍을 즐겁게 만들어 준다.

----
## 선수 지식
사실상 최근 자바스크립트는 모듈 구성을 이용하기 때문에 이에 대한 이해가 선행되어야 한다. 대부분의 내용을 도구나 라이브러리를 사용하는 것이기 때문에 스터디 진행 중에 함께 학습하면 충분할 것으로 본다.

* NPM : TypeScript 설치, 라이브러리 설치 등에 사용한다. Node를 설치하면 함께 설치된다.
* 모듈 로더 : 컴파일 타임에 TypeScript가 모듈을 찾더라도 런타임에는 모듈 로딩까지 자동으로 해 주는 것은 아니다. 그래서 [SystemJS](https://github.com/systemjs/systemjs)와 같은 모듈 로더를 사용해야 한다.

----
## 추천 교재
관련 책들도 출간되고 있지만 1~2년 정도 지난 내용을 다루고 있기 때문에 온라인 자료를 중심으로 학습을 하는 것이 바람직하다.

### [공식 tutorial](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
### [공식 handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html)

----
## 참고 자료
### [TypeScript 주 개발자의 직접 설명](https://channel9.msdn.com/Events/Build/2017/B8088/player)
터보 파스칼, 델파이, C# 등의 언어를 개발한 유명 개발자의 직강입니다. 비디오를 한 번 보면 전체적으로 파악하는데 도움이 됩니다. 자동 번역 같지만 한글 자막도 나오네요.

### [다양한 TypeScript 예제들](https://github.com/thatseeyou/jspm-typescript-examples)
'최신 웹 개발' 교육 과정에 활용하기 위해서 직접 작성한 코드이다. 다양한 라이브러리를 TypeScript와 어떻게 함께 사용할 수 있는지를 확인할 수 있을 것이다.

`
    convert(placeholder, markdown);
}