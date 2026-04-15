const weatherData = {
  /* ══════════════ SUNNY ══════════════ */
  sunny: {
    messages: {
      home:     { title: '완벽한 맑은 날이에요 ☀️', subtitle: '햇살 가득한 하루, 가볍고 밝게 나가봐요' },
      ootd:     { title: '맑은 날의 패션', subtitle: '밝고 산뜻한 여름 코디를 만나봐요' },
      food:     { title: '상큼한 한 끼 추천', subtitle: '맑은 날엔 가볍고 신선한 음식이 최고예요' },
      activity: { title: '나가기 딱 좋은 날!', subtitle: '바깥으로 나가 활기찬 하루를 채워봐요' },
    },
    ootd: [
      { id: 'so1', title: 'Summer Breeze', desc: '흰 리넨 셔츠와 데님 쇼츠의 조합. 시원하고 산뜻하게 여름을 즐겨봐요.', keywords: ['리넨 셔츠', '데님 쇼츠', '슬리퍼'], badges: ['UV차단 필수'], emoji: '👕' },
      { id: 'so2', title: 'Sunshine Dress', desc: '화사한 플로럴 미디 드레스. 소풍이나 브런치 데이트에 딱 어울리는 스타일.', keywords: ['플로럴 드레스', '스트로햇', '샌들', '크로스백'], badges: ['선글라스 매칭'], emoji: '👗' },
      { id: 'so3', title: 'City Walk', desc: '반팔 폴로 셔츠에 치노 팬츠. 도심 산책이나 가벼운 외출에 완벽한 스타일.', keywords: ['폴로 셔츠', '치노 팬츠', '로퍼'], badges: null, emoji: '👔' },
      { id: 'so4', title: 'Sporty Chic', desc: '크롭 후드와 와이드 레깅스. 운동 후에도 스타일리시하게 이어지는 룩.', keywords: ['크롭 후드', '와이드 레깅스', '러닝화', '캡 모자'], badges: ['모자 필수'], emoji: '🧢' },
      { id: 'so5', title: 'Linen Casual', desc: '오버핏 리넨 셔츠 하나로 완성하는 여름 룩. 가볍고 시원하며 어디에나 어울려요.', keywords: ['오버핏 리넨', '버뮤다 쇼츠', '에스파드리유'], badges: null, emoji: '🌿' },
      { id: 'so6', title: 'Picnic Perfect', desc: '체크 패턴 셔츠를 허리에 묶어 레이어드 효과를 더했어요. 피크닉에서 빛나는 개성 있는 코디.', keywords: ['체크 셔츠', '흰 반팔', '카고 팬츠', '트레킹 샌들'], badges: ['선크림 필수'], emoji: '🧺' },
    ],
    food: [
      { id: 'sf1', title: '아사이 볼', desc: '신선한 아사이 베리와 그래놀라, 계절 과일의 조화. 맑은 날 아침식사로 최고예요.', keywords: ['아사이', '그래놀라', '블루베리', '바나나'], badges: ['비건'], emoji: '🫐' },
      { id: 'sf2', title: '니수아즈 샐러드', desc: '참치와 달걀, 올리브가 들어간 남프랑스식 샐러드. 영양 가득한 가벼운 한 끼.', keywords: ['참치', '삶은 달걀', '올리브', '방울토마토'], badges: null, emoji: '🥗' },
      { id: 'sf3', title: '클럽 샌드위치', desc: '바삭한 빵 사이에 닭가슴살, 베이컨, 아보카도. 든든하지만 가벼운 브런치 메뉴.', keywords: ['닭가슴살', '베이컨', '아보카도', '구운 빵'], badges: ['고단백'], emoji: '🥪' },
      { id: 'sf4', title: '레몬 파스타', desc: '레몬 제스트와 올리브오일로 만드는 상큼한 여름 파스타. 20분 완성 레시피.', keywords: ['스파게티', '레몬', '올리브오일', '파마산'], badges: null, emoji: '🍋' },
      { id: 'sf5', title: '망고 빙수', desc: '제철 망고를 듬뿍 올린 달콤한 빙수. 맑고 뜨거운 날의 최고 디저트.', keywords: ['생망고', '우유 얼음', '연유', '망고 소스'], badges: ['오늘의 추천'], emoji: '🥭' },
      { id: 'sf6', title: '트로피컬 스무디 볼', desc: '냉동 열대 과일로 만든 진한 스무디에 토핑을 가득 얹었어요. 눈으로 먼저 먹는 한 끼.', keywords: ['파인애플', '망고', '코코넛', '치아씨드'], badges: ['비건'], emoji: '🍍' },
    ],
    activity: [
      { id: 'sa1', title: '한강 자전거', desc: '맑은 하늘 아래 한강 자전거 도로를 달리는 기분. 여의도→뚝섬 코스를 추천해요.', keywords: ['자전거', '한강', '야외', '운동'], badges: ['헬멧 필수', '선크림'], emoji: '🚴' },
      { id: 'sa2', title: '공원 피크닉', desc: '좋아하는 음식과 돗자리 하나로 완성. 서울숲, 올림픽공원이 인기 명소예요.', keywords: ['공원', '돗자리', '피크닉', '나들이'], badges: null, emoji: '🧺' },
      { id: 'sa3', title: '남산 러닝', desc: '상쾌한 아침 공기를 마시며 남산 코스를 달려봐요. 야경까지 덤으로 즐길 수 있어요.', keywords: ['러닝', '남산', '운동', '아침'], badges: ['수분 보충 필수'], emoji: '🏃' },
      { id: 'sa4', title: '루프탑 카페', desc: '탁 트인 하늘 아래 커피 한 잔. 뷰 맛집 루프탑에서 느긋한 오후를 즐겨봐요.', keywords: ['카페', '루프탑', '커피', '뷰'], badges: null, emoji: '☕' },
      { id: 'sa5', title: '식물원 탐방', desc: '국립수목원이나 서울식물원에서 초록을 가득 담는 하루. 산소 충전과 사진 스팟 동시에.', keywords: ['수목원', '식물원', '산책', '힐링'], badges: null, emoji: '🌱' },
    ],
  },

  /* ══════════════ CLOUDY ══════════════ */
  cloudy: {
    messages: {
      home:     { title: '구름 낀 차분한 날이에요 ⛅', subtitle: '여유롭고 감성적인 하루를 보내봐요' },
      ootd:     { title: '흐린 날의 레이어링', subtitle: '차분한 색감으로 감성 코디를 완성해봐요' },
      food:     { title: '따뜻한 한 끼 추천', subtitle: '흐린 날엔 속을 따뜻하게 채워주는 음식이 좋아요' },
      activity: { title: '조용하고 여유로운 하루', subtitle: '실내에서 감성을 충전해봐요' },
    },
    ootd: [
      { id: 'co1', title: 'Gray Layer', desc: '회색 오버핏 니트와 슬랙스 조합. 흐린 날의 차분한 무드를 완벽하게 표현해요.', keywords: ['오버핏 니트', '슬랙스', '앵클부츠'], badges: ['레이어링 추천'], emoji: '🧥' },
      { id: 'co2', title: 'Trench Classic', desc: '베이지 트렌치코트 하나로 완성하는 클래식 룩. 언제 어디서나 세련된 느낌.', keywords: ['트렌치코트', '터틀넥', '슬랙스', '첼시부츠'], badges: null, emoji: '🪭' },
      { id: 'co3', title: 'Cozy Knit', desc: '두툼한 케이블 니트와 와이드 데님. 포근하면서도 스타일리시한 데일리 룩.', keywords: ['케이블 니트', '와이드 데님', '스니커즈'], badges: null, emoji: '🧶' },
      { id: 'co4', title: 'Minimal Chic', desc: '흰 셔츠에 오버사이즈 블레이저. 심플하지만 완성도 높은 미니멀 코디.', keywords: ['흰 셔츠', '오버 블레이저', '슬림 팬츠', '더비슈즈'], badges: ['비즈니스 캐주얼'], emoji: '💼' },
      { id: 'co5', title: 'Earth Tone', desc: '카키, 브라운, 베이지의 어스톤 조합. 자연스럽고 따뜻한 느낌의 가을/봄 코디.', keywords: ['카키 자켓', '브라운 팬츠', '베이지 니트', '캠프부츠'], badges: null, emoji: '🌾' },
    ],
    food: [
      { id: 'cof1', title: '규동 (소고기 덮밥)', desc: '달큰하게 졸인 소고기와 양파가 밥 위에 가득. 흐린 날 든든하게 채워주는 한 그릇.', keywords: ['소고기', '양파', '달걀', '밥'], badges: null, emoji: '🍛' },
      { id: 'cof2', title: '크림 파스타', desc: '진한 생크림 소스에 버섯과 베이컨. 포근하고 고소한 맛이 흐린 날과 잘 어울려요.', keywords: ['생크림', '버섯', '베이컨', '페투치네'], badges: null, emoji: '🍝' },
      { id: 'cof3', title: '뜨거운 라떼', desc: '진하게 내린 에스프레소에 우유 거품을 듬뿍. 창가에서 즐기는 감성 카페 타임.', keywords: ['에스프레소', '우유 거품', '시나몬', '카페'], badges: ['오늘의 추천'], emoji: '☕' },
      { id: 'cof4', title: '된장찌개 정식', desc: '구수하고 깊은 된장찌개. 흐린 날엔 역시 엄마 손맛 같은 집밥이 최고예요.', keywords: ['된장찌개', '두부', '밥', '반찬'], badges: null, emoji: '🍲' },
      { id: 'cof5', title: '수프 & 바게트', desc: '걸쭉한 토마토 바질 수프에 바삭한 바게트를 찍어 먹어요. 유럽 감성 브런치.', keywords: ['토마토 수프', '바질', '바게트', '파마산'], badges: null, emoji: '🥖' },
    ],
    activity: [
      { id: 'ca1', title: '독립서점 투어', desc: '동네 작은 서점들을 탐방하며 좋아하는 책을 골라보는 흐린 날의 루틴.', keywords: ['서점', '독서', '카페', '동네 투어'], badges: null, emoji: '📚' },
      { id: 'ca2', title: '미술관 관람', desc: '국립현대미술관이나 리움 미술관에서 감성을 충전해봐요. 흐린 날 분위기와 딱.', keywords: ['미술관', '전시', '문화', '감성'], badges: null, emoji: '🖼️' },
      { id: 'ca3', title: '홈 베이킹', desc: '포근한 집에서 쿠키나 케이크를 구워봐요. 집 안 가득 퍼지는 달콤한 향이 최고예요.', keywords: ['베이킹', '쿠키', '케이크', '홈카페'], badges: ['초보 가능'], emoji: '🍪' },
      { id: 'ca4', title: '영화관 데이트', desc: '오래 보고 싶었던 영화를 드디어 영화관에서. 팝콘과 함께하는 흐린 날 최고의 코스.', keywords: ['영화', '팝콘', '데이트', '실내'], badges: null, emoji: '🎬' },
    ],
  },

  /* ══════════════ RAINY ══════════════ */
  rainy: {
    messages: {
      home:     { title: '비 오는 날이에요 🌧️', subtitle: '창밖 빗소리와 함께 따뜻한 하루를 보내요' },
      ootd:     { title: '비 맞지 않는 스타일링', subtitle: '방수와 패션, 두 마리 토끼를 잡아봐요' },
      food:     { title: '빗소리와 어울리는 한 끼', subtitle: '비 오는 날엔 바삭하고 따뜻한 음식이 최고예요' },
      activity: { title: '실내에서 즐기는 하루', subtitle: '빗소리를 BGM 삼아 감성 충전 타임' },
    },
    ootd: [
      { id: 'ro1', title: 'Rain Proof', desc: '방수 소재 트렌치코트가 핵심. 색감 포인트를 더해 비 오는 날에도 패셔너블하게.', keywords: ['방수 트렌치', '터틀넥', '방수 첼시부츠'], badges: ['우산 필수', '방수 필수'], emoji: '🧥' },
      { id: 'ro2', title: 'Rainy Chic', desc: '투명 PVC 우산과 모노톤 코디의 조합. 심플하지만 비 오는 날의 시크한 룩.', keywords: ['투명 우산', '블랙 트렌치', '슬림 팬츠', '앵클부츠'], badges: ['우산 스타일링'], emoji: '☂️' },
      { id: 'ro3', title: 'Cozy Rain', desc: '후드 조거와 방수 스니커즈. 편하고 실용적이면서 스트릿 감성을 살렸어요.', keywords: ['후드 집업', '조거 팬츠', '방수 스니커즈', '캡'], badges: null, emoji: '🎒' },
      { id: 'ro4', title: 'Dark Romance', desc: '딥 버건디 코트에 블랙 이너. 비 오는 날의 감성적인 다크 무드 코디.', keywords: ['버건디 코트', '블랙 니트', '블랙 팬츠', '앵클부츠'], badges: null, emoji: '🍷' },
    ],
    food: [
      { id: 'rf1', title: '파전 & 막걸리', desc: '비 오는 날에 파전과 막걸리는 국룰. 바삭한 파전에 시원한 막걸리 한 잔.', keywords: ['파전', '막걸리', '청양고추', '김치'], badges: ['비 오는 날 국룰'], emoji: '🥞' },
      { id: 'rf2', title: '칼국수', desc: '쫄깃한 면발에 진한 멸치 육수. 비 오는 날 몸을 녹여주는 최고의 한 그릇.', keywords: ['칼국수', '멸치 육수', '호박', '감자'], badges: null, emoji: '🍜' },
      { id: 'rf3', title: '감자전', desc: '갈아서 만든 감자전은 바삭한 겉과 촉촉한 속이 매력. 간장 양념에 찍어 먹어요.', keywords: ['감자', '간장', '파', '참깨'], badges: ['홈쿡 추천'], emoji: '🥔' },
      { id: 'rf4', title: '순두부찌개', desc: '뚝배기에서 보글보글 끓는 순두부찌개. 매콤하고 부드러운 국물이 속을 따뜻하게 해줘요.', keywords: ['순두부', '조개', '달걀', '고추가루'], badges: null, emoji: '🌶️' },
      { id: 'rf5', title: '핫초코 & 마시멜로', desc: '달콤하고 진한 핫초코에 마시멜로를 녹여가며 즐겨요. 창밖 빗소리와 최고의 페어링.', keywords: ['코코아', '마시멜로', '생크림', '시나몬'], badges: ['오늘의 드링크'], emoji: '☕' },
    ],
    activity: [
      { id: 'rai1', title: '카페 작업', desc: '창가 자리에서 빗소리를 BGM 삼아 공부하거나 작업해봐요. 집중력이 올라가는 날.', keywords: ['카페', '작업', '노트북', '집중'], badges: null, emoji: '💻' },
      { id: 'rai2', title: '실내 전시 관람', desc: '디뮤지엄, 아르떼뮤지엄 같은 미디어아트 전시는 비 오는 날 분위기와 딱 어울려요.', keywords: ['미디어아트', '전시', '실내', '감성'], badges: null, emoji: '✨' },
      { id: 'rai3', title: '홈 씨네마', desc: '좋아하는 영화를 골라 담요를 덮고 감상. 치킨이나 피자와 함께하면 완벽한 빗날 코스.', keywords: ['영화', '담요', '치킨', '홈시어터'], badges: ['추천 장르: 로맨스'], emoji: '🎬' },
      { id: 'rai4', title: '빗소리 드로잉', desc: '스케치북에 빗 맞는 창밖 풍경을 담아봐요. 그림 실력보다 감성이 중요한 시간.', keywords: ['드로잉', '스케치', '감성', '취미'], badges: null, emoji: '✏️' },
    ],
  },

  /* ══════════════ SNOWY ══════════════ */
  snowy: {
    messages: {
      home:     { title: '눈 내리는 날이에요 ❄️', subtitle: '하얀 세상을 바라보며 따뜻한 하루를 보내요' },
      ootd:     { title: '눈 오는 날의 방한 룩', subtitle: '따뜻하면서도 스타일리시하게 겨울을 즐겨봐요' },
      food:     { title: '몸을 녹여줄 따뜻한 음식', subtitle: '눈 오는 날엔 뜨겁고 포근한 음식이 최고예요' },
      activity: { title: '눈 오는 날의 특별한 하루', subtitle: '설경을 즐기거나 따뜻한 실내에서 힐링해봐요' },
    },
    ootd: [
      { id: 'sno1', title: 'Snow Warrior', desc: '롱 패딩과 방한 부츠로 완성. 추위는 패딩이 막고 스타일은 색감이 살려요.', keywords: ['롱 패딩', '방한 부츠', '두꺼운 양말', '니트 비니'], badges: ['미끄럼 주의', '방한 필수'], emoji: '🧊' },
      { id: 'sno2', title: 'Cozy Fur', desc: '퍼 트리밍 코트에 니트 스웨터. 동화 속 주인공처럼 눈 오는 날을 걸어봐요.', keywords: ['퍼 코트', '니트 스웨터', '와이드 팬츠', '스노우 부츠'], badges: null, emoji: '🦌' },
      { id: 'sno3', title: 'Chunky Knit', desc: '두툼한 오버핏 니트는 눈 오는 날 최고의 아이템. 스웨트 팬츠와 함께 코지 룩 완성.', keywords: ['청키 니트', '스웨트 팬츠', '어그 부츠', '목도리'], badges: ['보온 최우선'], emoji: '🧶' },
      { id: 'sno4', title: 'Ski Chic', desc: '스키 점프수트 또는 테크니컬 아우터로 스포티한 스노우 룩. 기능성과 패션 모두 챙겨요.', keywords: ['테크니컬 자켓', '플리스', '스키 팬츠', '고글'], badges: ['스키장 추천'], emoji: '⛷️' },
    ],
    food: [
      { id: 'snof1', title: '떡볶이 & 튀김', desc: '눈 오는 날 포차 떡볶이는 진리. 어묵 국물에 몸을 녹이며 튀김까지 곁들여요.', keywords: ['떡볶이', '어묵', '튀김', '순대'], badges: ['눈 오는 날 필수'], emoji: '🍢' },
      { id: 'snof2', title: '설렁탕', desc: '맑고 진한 사골 육수에 소면과 깍두기. 눈 오는 날 몸 속부터 따뜻하게 채워줘요.', keywords: ['사골 육수', '소면', '깍두기', '소금'], badges: null, emoji: '🍲' },
      { id: 'snof3', title: '핫 아메리카노', desc: '진하게 내린 아메리카노 한 잔. 눈 오는 창가에서 마시는 커피는 특별한 감성을 만들어요.', keywords: ['아메리카노', '에스프레소', '따뜻한', '카페'], badges: ['오늘의 드링크'], emoji: '☕' },
      { id: 'snof4', title: '군고구마', desc: '달콤하고 포근한 군고구마. 눈 오는 날 손을 녹이며 먹는 간식의 정석이에요.', keywords: ['고구마', '버터', '달콤한', '간식'], badges: null, emoji: '🍠' },
      { id: 'snof5', title: '순대국밥', desc: '뜨끈한 국물에 순대와 내장이 가득. 눈 속을 헤치고 찾아가는 보람이 있는 한 그릇.', keywords: ['순대', '국밥', '새우젓', '깍두기'], badges: null, emoji: '🥣' },
    ],
    activity: [
      { id: 'snoa1', title: '설경 산책', desc: '눈 쌓인 공원이나 산을 걸으며 하얀 세상을 사진에 담아봐요. 미끄러운 길 조심!', keywords: ['설경', '산책', '사진', '공원'], badges: ['미끄럼 주의'], emoji: '📸' },
      { id: 'snoa2', title: '스키 & 보드', desc: '눈 오는 날이야말로 스키장으로! 용평, 하이원, 비발디파크에서 설원을 가로질러봐요.', keywords: ['스키', '스노보드', '리프트', '스키장'], badges: ['장비 렌탈 가능'], emoji: '⛷️' },
      { id: 'snoa3', title: '눈사람 만들기', desc: '소박하지만 가장 재미있는 겨울 놀이. 눈이 충분히 쌓이면 당장 밖으로 나가봐요.', keywords: ['눈사람', '눈싸움', '야외', '놀이'], badges: null, emoji: '⛄' },
      { id: 'snoa4', title: '홈 독서', desc: '따뜻한 이불 속에서 오래 읽고 싶었던 책을 펼쳐봐요. 뜨거운 차 한 잔과 함께.', keywords: ['독서', '홈', '이불', '차'], badges: null, emoji: '📖' },
    ],
  },
};

export default weatherData;
