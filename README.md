export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
export PATH=$PATH:$ANDROID_SDK_ROOT/tools
source ~/.zshrc

# 의존성 밀고 다시 하고 싶을 때
# node_modules가 의존성 폴더고,
# package-lock은 캐시 같은 것들이고,
# npm install하면 package.json에 저장됐던, 이제까지 사용했던 의존성 전부 깔리는 거임.
rm -rf node_modules
rm package-lock.json
npm install

npx react-native run-android

# 실행할 때 순서
1. 패키지.json : 의존성 확인함
2. babel + ts config : 타입, 컴파일 관련 파일. ts<->js간 타입 확인하는 것. 그래서 전부 json 파일로 작성되는 것이고, babel이 js 파일인 것.
3. metro : 실행 관련 파일. 마찬가지로 얘도 js 파일인 것. 기본이 js라서. 수천 개의 파일 (컴포넌트, 이미지, 모듈 등)을 모아서 하나의 '번들'로 만들어줌. 그래서 번들러 관련 파일이라고 함.
# 이후부터 파일 실행됨
4. index.js : JS entry point.
5. App.tsx : 여기서부터 ts 파일이 됨. UI entry point.
6. 만약 네비게이션을 따로 둔다면 Navigation.tsx
7. 이후 네비게이션에서 작성된 대로 파일 이동하게 됨.
