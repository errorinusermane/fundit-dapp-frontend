export JAVA_HOME="/Library/Java/JavaVirtualMachines/temurin-20.jdk/Contents/Home"
export PATH="$JAVA_HOME/bin:$PATH"
export JAVA_HOME=$(/usr/libexec/java_home -v 20)

export ANDROID_HOME=/Users/susie/Library/Android/sdk
export PATH=$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH

source ~/.zshrc

npx react-native doctor

# 의존성 밀고 다시 하고 싶을 때
# node_modules가 의존성 폴더고,
# package-lock은 캐시 같은 것들이고,
# npm install하면 package.json에 저장됐던, 이제까지 사용했던 의존성 전부 깔리는 거임.
rm -rf node_modules
rm package-lock.json
npm install

npx react-native run-android

# ========================================== #

# 실행할 때 순서
1. 패키지.json : 의존성 확인함
2. babel + ts config : 타입, 컴파일 관련 파일. ts<->js간 타입 확인하는 것. 그래서 전부 json 파일로 작성되는 것이고, babel이 js 파일인 것.
3. metro : 실행 관련 파일. 마찬가지로 얘도 js 파일인 것. 기본이 js라서. 수천 개의 파일 (컴포넌트, 이미지, 모듈 등)을 모아서 하나의 '번들'로 만들어줌. 그래서 번들러 관련 파일이라고 함.
# 이후부터 파일 실행됨
4. index.js : JS entry point.
5. App.tsx : 여기서부터 ts 파일이 됨. UI entry point.
6. 만약 네비게이션을 따로 둔다면 Navigation.tsx
7. 이후 네비게이션에서 작성된 대로 파일 이동하게 됨.

# ========================================== #

# 실행 오래 걸릴 때
rm -rf android/build
rm -rf android/app/build

watchman watch-del-all
rm -rf node_modules
rm -rf yarn.lock package-lock.json pnpm-lock.yaml
rm -rf /tmp/metro-*
rm -rf android/app/build
rm -rf ~/.pnpm-store
npm install

# 오류: watchman 권한 없다고 뜰 때
- npx react-native --version
- 위 코드로 버전과
- package.json의 패키지들 버전 호환되고 있는지 확인
- 아니라면 npm install 시 업데이트하기
- 그리고 아래 다시 빌드

watchman watch-del-all || true
rm -rf node_modules
rm -rf android/.gradle
rm -rf android/build
rm -rf android/app/build
rm -rf android/.idea
rm -rf android/.cxx
rm -rf android/local.properties
rm -f yarn.lock package-lock.json

npm install

cd android && ./gradlew clean && cd ..

npx react-native start --reset-cache

sudo chmod -R 755 ~/Desktop/Temp_Laptop3

npx react-native run-android
