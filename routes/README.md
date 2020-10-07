# Green Life API Docs

1. [POST]  /user/signup 회원가입 
2. [POST] /user/login 로그인 
3. [GET] /challenge/all 챌린지 목록 
4. [GET] /challenge/detail/:id 챌린지 상세 정보(서브 챌린지 포함)
5. [PUT] /challenge/do/subchallenge/:id 서브 챌린지 참여 버튼 클릭
6. [POST] /feed/upload 사진 업로드
7. [GET] /feed/ 피드 전체 보기 
8. [GET] /user/rank 명예의 전당


1. .회원 가입
::method:: : POST
::url:: : /user/signup

::요청 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::요청 Body:: 
```json
{
    "email" : "kimsj@naver.com",
    "nickname" : "김수진",
    "password" : "qwer1234"
}
```

::응답 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::응답 Body::
```json
{
	"success": true | false
}
```


2. 회원 로그인
::method:: : POST
::url:: : /user/login

::요청 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::요청 Body:: 
```json
{
    "email" : "kimsj@naver.com",
    "password" : "qwer1234"
}
```

::응답 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::응답 Body::
```json
{
    "success": true | false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWY3YzkwNzZkMGQ1ZGYyZWNkNTc4MTQ2IiwiZXhwIjoxNjAyNjAzOTU5NjA0LCJpYXQiOjE2MDE5OTkxNTl9.id6aqj5qX1PxJqn8VPPAb8Sd2N6_50h9H_Xh6rYOu6Q",
    "nickname": "김수진"
}
```


3. 챌린지 목록
::method:: : GET
::url:: : /challenge/all

::요청 Header::
::요청 Body:: 

::응답 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::응답 Body::
```json
{
	  "success" : true,
    "challenge": [
        {
            "subchallenges": [
                "5f7c966c0e282281277004fd",
                "5f7c966c0e282281277004fe",
                "5f7c966c0e282281277004ff",
                "5f7c966c0e28228127700500",
                "5f7c966c0e28228127700501"
            ],
            "_id": "5f7c977c0e28228127700502",
            "title": "콸콸, 쓰는 물이 많으면 \n 졸졸, 먹는 물이 부족해져요.",
            "imageUrl": "images/challenge/1.jpg",
            "text": "소중한 물을 아껴주세요. \n 지구 전체의 물 중 먹을 수 있는 물은 1% 미만이라고 합니다. 유엔의 연구결과에 따르면 2025년이 되면 약 30억 명 이상이 식수난에 직면할 것으로 예측된다고 합니다."
        },
        {
            "subchallenges": [
                "5f7c966c0e28228127700503",
                "5f7c966c0e28228127700504",
                "5f7c966c0e28228127700505",
                "5f7c966c0e28228127700506",
                "5f7c966c0e28228127700507"
            ],
            "_id": "5f7c999f0e28228127700508",
            "title": "녹고 있는 빙하 위 \n 북극곰들을 구해주세요!",
            "imageUrl": "images/challenge/2.jpg",
            "text": "소중한 생명을 끊지 말아주세요. \n 바다 얼음 위에서 먹잇감을 사냥하는 북극곰은 바다 얼음이 줄면 먹잇감을 찾아 해매야해요. 결국은 식량 부족으로 새끼도 기를 수 없게 돼요. 이대로라면 2100년에는 북극곰을 지구상에서 볼 수 없어요."
        }
    ]
}
```

4. 챌린지 상세 보기 (+ 서브 챌린지 확인)
::method:: GET
::url:: : /challenge/detail/:id (id는 챌린지 id)
::요청 Header::   
```
token : 로그인할 때 받은 토큰 값
```
::요청 Body:: 

::응답 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::응답 Body:: 
```json
{
    "subchallenges": [
        {
            "participate": 3,
            "_id": "5f7c966c0e282281277004fd",
            "title": "양치 시 양치 컵을 사용하고 수도꼭지를 잠가 놓는 실천을 해봐요."
        },
        {
            "participate": 0,
            "_id": "5f7c96a70e282281277004ff",
            "title": "물을 받아서 설거지를 해봐요."
        },
        {
            "participate": 0,
            "_id": "5f7c96b40e28228127700500",
            "title": "샤워 시간을 줄여 보아요."
        },
        {
            "participate": 0,
            "_id": "5f7c96c60e28228127700501",
            "title": "양변기 수조에 벽돌 혹은 물병을 쏙! 넣어볼까요?"
        }
    ],
    "_id": "5f7c9d7d0e28228127700509",
    "title": "콸콸, 쓰는 물이 많으면 \n 졸졸, 먹는 물이 부족해져요.",
    "imageUrl": "images/challenge/1.jpg",
    "text": "소중한 물을 아껴주세요. \n 지구 전체의 물 중 먹을 수 있는 물은 1% 미만이라고 합니다. 유엔의 연구결과에 따르면 2025년이 되면 약 30억 명 이상이 식수난에 직면할 것으로 예측된다고 합니다."
}

```


5. 서브 챌린지 참여 버튼 클릭
::method:: : PUT
::url:: :  challenge/do/subchallenge/:id (id는 서브챌린지 id)
::요청 Header:: 
```
token : 로그인할 때 받은 토큰 값
```
::요청 Body:: 


::응답 Header:: 
```
Content-Type : application/json; charset=utf-8
```

::응답 Body:: 
```json
{
	  "success" : true,
    "count": 8
}
```

6. 피드 사진 업로드 
::method:: : POST
::url:: feed/upload
::요청 Header::  
```
token : 로그인할 때 받은 토큰 값
```
::요청 Body::  
```
form-data 멀티미디어로 전송 
key는 이미지로 설정 
```

::응답 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::응답 Body:: 
```json
{
    "success": true
}
```

7. 피드 전체보기
::method:: : GET 
::url:: : /feed/
::요청 Header:: 
::요청 Body:: 

::응답 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::응답 Body:: 
```json
{
    "success": true,
    "feed": [
        {
            "_id": "5f7ca58a81d8c231ceed95d6",
            "imageUrl": "images/feed/1602004362009.png",
            "user": {
                "_id": "5f7c9ab8e83a222efed0584e",
                "nickname": "솜솜"
            },
            "created": "2020-10-06T17:12:42.014Z",
            "__v": 0
        },
        {
            "_id": "5f7ca634f933123213684517",
            "imageUrl": "images/feed/1602004532720.png",
            "user": {
                "_id": "5f7c9ab8e83a222efed0584e",
                "nickname": "솜솜"
            },
            "created": "2020-10-06T17:15:32.727Z",
            "__v": 0
        }
    ]
}
```


8. 명예의 전당
::method:: : GET 
::url:: : user/rank
::요청 Header:: 
::요청 Body:: 

::응답 Header:: 
```
Content-Type : application/json; charset=utf-8
```
::응답 Body:: 
```json
{
    "success": true,
    "user": [
        {
            "weekChallengeCount": 70,
            "_id": "5f7c92b50e282281277004fa",
            "nickname": "아영"
        },
        {
            "weekChallengeCount": 40,
            "_id": "5f7c92a10e282281277004f9",
            "nickname": "진수"
        },
        {
            "weekChallengeCount": 20,
            "_id": "5f7c928c0e282281277004f8",
            "nickname": "수진"
        },
        {
            "weekChallengeCount": 15,
            "_id": "5f7c92ee0e282281277004fc",
            "nickname": "냠냠이"
        },
        {
            "weekChallengeCount": 3,
            "_id": "5f7c92c90e282281277004fb",
            "nickname": "빱이"
        }
    ]
}
```


