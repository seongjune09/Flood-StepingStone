# 💧 홍수디딤이
<img width="345" height="624" alt="image" src="https://github.com/user-attachments/assets/b6e4132a-0242-4ee5-b92a-82ae5aa4a1a9" />
<img width="348" height="617" alt="image" src="https://github.com/user-attachments/assets/d1956ace-e032-4e76-b9ea-a77bc29e0fbc" /> <br>


 <br>

📅 2025.12.01 ~ 2025.12.15

홍수디딤이는 침수 상황에서 운전자의 생명을 지키는 자동 창문 개방 시스템입니다.


수위 감지 센서가 차량 침수를 실시간으로 감지하고, 배터리가 완전히 잠기기 전에 창문을 자동으로 열어 운전자가 신속히 탈출할 수 있도록 도와줍니다.

---

# 🔍 문제상황

최근 기후 변화로 인해 집중호우와 도시 침수 사고가 빈번하게 발생하고 있습니다.
특히 지하 주차장이나 도심 지역(예: 강남)에서는 차량이 순식간에 물에 잠기는 사례가 늘어나면서 운전자들이 미처 대피하지 못해 인명 피해로 이어지는 경우가 많습니다.
차량은 일정 수위 이상 잠기면 수압으로 인해 문이 열리지 않고, 전원이 차단되면 전동식 창문도 작동하지 않아 탈출이 불가능해집니다.

<img width="420" height="260" alt="image" src="https://github.com/user-attachments/assets/a7c72913-81c7-439f-b88f-b43702ada6b3" />
<img width="420" height="260" alt="image" src="https://github.com/user-attachments/assets/e077c646-dc06-486f-8891-57a078a1914c" />

---

# ‼️ 기존 탈출 방법
<img width="973" height="426" alt="image" src="https://github.com/user-attachments/assets/b170da54-e97f-450b-9e06-f61b29f1ed0a" />

기존의 탈출 방법에는 비상 망치, 혹은 목 받침대를 뽑아 유리창 모서리를 깨고 탈출하는 방법이 있습니다.

그러나 이는 차에 비상 망치를 제대로 구비하지 않는 경우가 많고, 패닉 상태에서는 정확한 사용이 어렵다는 한계가 있습니다.

---

# ✔️ 프로젝트 소개

# (1) ⛳️ 목적
- 위의 문제를 해결하기 위해, 차량이 물에 잠기기 시작할 때 배터리가 완전히 침수되기 전에 창문을 자동으로 열어주는 시스템을 고안하게 되었습니다.
- 운전자가 침수 상황에서도 신속히 탈출할 수 있도록 도와 홍수 시 발생하는 인명 피해를 최소화하는 것이 이 프로젝트의 핵심 목적입니다.


---

# (2) ⚙️ 동작 원리
<img width="1123" height="449" alt="image" src="https://github.com/user-attachments/assets/4d827a71-d91d-4ddd-870e-f095ab8ff481" />

- 차량 하부에는 총 2개의 워터 센서가 **서로 다른 높이**에 설치되어 침수 단계를 구분할 수 있도록 설계했습니다.
  
- **1번 센서** — 초기 침수 감지
- **2번 센서** — 침수 진행 정도 판단 → 5초 이상 감지 시 창문 자동 개방

---

# (3)주요 기능
- ## (1) 침수 감지 및 실시간 시각화
<img width="708" height="445" alt="image" src="https://github.com/user-attachments/assets/891c29d0-6ce2-4b60-bb23-2f4e9f2ca951" />

- 두 센서의 상태를 바탕으로 웹페이지에서 차량이 어느 정도까지 잠겼는지를 이미지로 직관적으로 표시합니다.
- 하드웨어에서는 부저 센서를 활용하여 운전자에게 경고음을 출력합니다.
- 2번 센서에 물이 5초 이상 감지되면 창문을 자동으로 개방하여 탈출을 돕습니다.

---

- ## (2) 침수 단계 알림 및 기록
<img width="625" height="461" alt="image" src="https://github.com/user-attachments/assets/7a1f4d57-60f6-4bbb-a82b-aec06f62e799" />

- 워터 센서를 통해 침수 단계가 변화하면 해당 시간과 침수 단계를 알림으로 전송합니다.
- 알림 페이지에서 몇 시 몇 분에 몇 단계의 침수가 발생했는지 한눈에 확인할 수 있습니다.

---

- ## (3) 조명 색상 커스텀
<img width="300" height="612" alt="image" src="https://github.com/user-attachments/assets/f095e2b4-91e3-497b-881d-9ee5ae2dc583" />
<img width="300" height="612" alt="image" src="https://github.com/user-attachments/assets/77752770-1eca-450f-babb-fe551cf7d6cf" />
<img width="300" height="612" alt="image" src="https://github.com/user-attachments/assets/32825f47-b93f-494b-8a40-e4c2b58a5a04" />

- 설정 페이지에서 현재등 / 경고등 / 위험등 3단계의 색상을 사용자가 직접 원하는 색으로 변경할 수 있습니다. 
- 기본 색상 외에도 커스텀 색상을 지원하여 개인 취향에 맞게 알림 색상을 설정할 수 있습니다.

---

# ⚙️ 하드웨어 구성
<img width="778" height="254" alt="image" src="https://github.com/user-attachments/assets/20ed4e9c-20d0-486b-957d-2d734d72cd32" />

## 워터 센서 
- 차량 침수 여부를 직접 감지해야 하기 때문에 사용했습니다.
- 2개를 서로 다른 높이에 배치해 초기 침수와 심화 침수를 단계별로 구분할 수 있도록 했습니다.

---

## 수동 부저 
- 시각적 알림만으로는 패닉 상태의 운전자가 놓칠 수 있기 때문에,
  청각적 경고음을 함께 출력해 운전자가 즉각적으로 위험을 인지할 수 있도록 사용했습니다.

---
  
## 서보모터 
침수가 일정 수준 이상 진행되면 전원이 차단되어 기존 전동 창문이 작동하지 않습니다. 
이를 대비해 독립적으로 창문을 물리적으로 개방할 수 있도록 서보모터를 사용했습니다.

---

<img width="500" height="260" alt="image" src="https://github.com/user-attachments/assets/4689303a-97db-48a7-a4d0-b4247831feb9" />
<img width="500" height="260" alt="image" src="https://github.com/user-attachments/assets/50d51a2b-c6a5-4696-9e3a-7add5d9c7bf6" />

---

# 👍🏻 배운 점 및 느낀 점
- 네트워크 시간에 진행한 이번 프로젝트는 저에게 정말 의미 있는 경험이었습니다. 초기 아이디어 선정 단계에서 팀원을 설득해 프로젝트 방향을 이끌었던 만큼, 잘 따라와 줄지에 대한 걱정과 내가 더 열심히 해야 한다는 부담감도 함께 있었습니다.
  개발 기간 2주 동안 좀처럼 진전이 없어 제출 전날까지도 불안함이 있었습니다. 결국 제출 5일 전, 기숙사에서 밤을 새우며 하드웨어 연결에 성공했고 그 순간은 정말 잊지 못할 기억으로 남아 있습니다.
  이번 프로젝트를 통해 하드웨어의 구성과 동작 원리를 직접 익힐 수 있었고, 팀원과 함께 협업하는 것에 대한 두려움도 사라졌습니다. 무엇보다 네트워크 프로젝트에서 2등으로 수상하는 결과까지 얻어 더욱 뿌듯하고 기쁜 프로젝트였습니다.

---

# 👥 팀원 소개

|[강준석](https://github.com/Kangjunseok09)|[박성준](https://github.com/seongjune09)
|:---:|:---:|
|백앤드, 하드웨어|프론트엔드, 하드웨어|
<img width="130" alt="image" src="https://github.com/user-attachments/assets/7388ef1e-c9b3-4c8c-acb0-1acca6aabcd5" />| <img width="130" src="https://github.com/user-attachments/assets/ace95578-2f8a-4e95-8755-d812a255278b">|

---

# 🛠 기술 스택

<img height="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" />   <img height="60" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" />   <img height="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" />  <img height="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/raspberrypi/raspberrypi-original.svg" />

---


# 🔗 배포 링크
[🌐 홍수디딤이 바로가기](https://flood-steping-stone.vercel.app)  *(아이폰 16 반응형 뷰 기준 [399 x 712])*

⚠️  현재 기기가 구동 중이지 않아 자세한 시연은 영상을 통해 확인해주세요.

---

# [▶ 웹 시연 영상 확인하기](https://youtu.be/x04e1FFhbAE)

# [▶ 하드웨어 시연 영상 확인하기](https://youtu.be/EBbUkMSjvfs)

