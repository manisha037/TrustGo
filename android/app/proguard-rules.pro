# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/android-sdk/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.

# Keep Turbomodule and Reanimated classes
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.swmansion.reanimated.** { *; }

# Additional recommended rules for React Native
-keep class com.facebook.jni.** { *; }
-keep class com.facebook.react.** { *; }