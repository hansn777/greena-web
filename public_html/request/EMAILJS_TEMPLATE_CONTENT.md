# EmailJS 템플릿 설정 가이드

## 템플릿 변수 매핑

request.html에서 보내는 변수들을 EmailJS 템플릿에 맞게 설정하세요.

## 1. Subject (제목) 필드

현재: `Contact Us: {{title}}`

**변경:**

```
{{subject}}
```

또는

```
견적문의: {{inquiry_type}}
```

## 2. Content (내용) 필드

현재 템플릿의 변수들을 request.html의 변수로 교체하세요.

### Desktop/Mobile Content에 입력할 내용:

```
문의 유형: {{inquiry_type}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 담당자 정보

• 회사명: {{company_name}}
• 이름: {{from_name}}
• 연락처: {{phone}}
• 이메일: {{from_email}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 기기 종류

{{device_type}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{% if inquiry_type == "렌탈 문의" %}
🏠 렌탈 정보

• 지역: {{region}}
• 공기청정기 평수: {{room_size}}
• 기기 대수: {{device_count}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{% endif %}

💬 별도 문의사항

{{content}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 3. Right Sidebar 설정

### To Email 필드

현재: `greena911greena@gmail.com`

**변경:**

```
greena911@naver.com
```

또는 템플릿 변수 사용:

```
{{to_email}}
```

### From Name 필드

현재: `{{name}}`

**변경:**

```
{{from_name}}
```

### From Email 필드

현재: "Use Default Email Address" 체크됨

**옵션 1:** 체크 해제하고 입력:

```
{{from_email}}
```

**옵션 2:** 체크 유지 (기본 이메일 주소 사용)

### Reply To 필드

현재: `{{email}}`

**변경:**

```
{{from_email}}
```

## 4. 사용 가능한 모든 변수

request.html에서 보내는 변수 목록:

- `{{to_email}}` - 수신 이메일 (greena911@naver.com)
- `{{from_email}}` - 발신 이메일 (사용자 입력)
- `{{from_name}}` - 발신자 이름
- `{{company_name}}` - 회사명
- `{{phone}}` - 연락처
- `{{inquiry_type}}` - 문의 유형 ("유지관리 문의" 또는 "렌탈 문의")
- `{{device_type}}` - 기기 종류 (예: "공기청정기, 공기순환기")
- `{{region}}` - 지역 (렌탈 문의만)
- `{{room_size}}` - 공기청정기 평수 (렌탈 문의만)
- `{{device_count}}` - 기기 대수 (렌탈 문의만)
- `{{content}}` - 별도 문의사항
- `{{subject}}` - 이메일 제목

## 5. 단계별 설정 방법

1. **Subject 필드 수정**

   - `Contact Us: {{title}}` → `{{subject}}`로 변경

2. **Content 필드 수정**

   - 위의 Content 예시를 복사하여 붙여넣기
   - "Edit Content" 버튼을 클릭하여 편집 모드로 전환

3. **Right Sidebar 수정**

   - To Email: `greena911@naver.com` 또는 `{{to_email}}`
   - From Name: `{{from_name}}`
   - Reply To: `{{from_email}}`

4. **저장**
   - 우측 상단의 "Save" 버튼 클릭

## 참고사항

- EmailJS 템플릿에서는 `{% if %}` 구문을 사용할 수 있습니다
- 변수명은 대소문자를 구분하므로 정확히 입력해야 합니다
- 사용하지 않는 변수는 무시됩니다
