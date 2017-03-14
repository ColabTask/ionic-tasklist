# Installation guide

## Install ionic
This section is based on this [getting started from Ionic.io](http://ionicframework.com/getting-started/)

```
npm install -g cordova ionic
```

## Install projects requirements
```
cd ionic-tasklist/tasklist
npm install
```

## Run a simulation on browser

To run a simulation just use the command `ionic serve`.

You can use the Responsive Design Mode of your browser if you have one to see the render on a specific device.

* [Documentation for Firefox](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode)
* [Documentation for Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode/)

## Installation on Android device

To compile and deploy on Android device you need to :

1. Install android SDK (package `android-sdk`)
2. Install some package with the package manager of your android SDK
3. Install a Java Development Kit (JDK)
4. Define environment variables `ANDROID_HOME` and `JAVA_HOME`
5. Put your device in debug mode
6. Plug your device to your computer
7. Run ionic command to compile and deploy

```
export ANDROID_HOME=$HOME/Android/Sdk
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
ionic run android --device
```

## Installation on iOS device

This part is not documented and need an upgrade.
Feel free to contribute to the project on this purpose.
