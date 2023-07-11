// Demo of https://github.com/MaaAssistantArknights/MAA1999/blob/main/assets/resource/pipeline/startup.json

import { $ } from '@/pipeline'

export const {
  StartUp,
  Start1999,
  BluePochLogo,
  Disclaimer,
  GameLoading,
  Download,
  CloseAnnouncement,
  StartGame,
  HomeLoading,
  HomeFlag,
  BackButton,
  HomeButton
} = $('1999')

StartUp.$ = {
  next: [
    BluePochLogo,
    Disclaimer,
    GameLoading,
    Download,
    StartGame,
    CloseAnnouncement,
    HomeButton,
    BackButton,
    HomeLoading,
    HomeFlag,
    Start1999
  ]
}

Start1999.$ = {
  action: 'StartApp',
  package:
    'com.shenlan.m.reverse1999/com.ssgame.mobile.gamesdk.frame.AppStartUpActivity',
  next: [StartUp]
}

BluePochLogo.$ = {
  recognition: 'TemplateMatch',
  template: 'template/StartUp/BluePochLogo.png',
  roi: [298, 163, 620, 336],
  next: [
    BluePochLogo,
    Disclaimer,
    GameLoading,
    Download,
    StartGame,
    CloseAnnouncement
  ]
}

Disclaimer.$ = {
  recognition: 'TemplateMatch',
  template: 'template/StartUp/Disclaimer.png',
  roi: [512, 107, 238, 214],
  next: [Disclaimer, GameLoading, Download, StartGame, CloseAnnouncement]
}

GameLoading.$ = {
  recognition: 'TemplateMatch',
  template: 'template/StartUp/GameLoading.png',
  roi: [323, 0, 599, 563],
  next: [GameLoading, Download, StartGame, CloseAnnouncement]
}

Download.$ = {
  recognition: 'TemplateMatch',
  template: 'template/StartUp/Download.png',
  roi: [712, 390, 187, 150],
  action: 'Click',
  next: [GameLoading, Download, StartGame, CloseAnnouncement]
}

CloseAnnouncement.$ = {
  recognition: 'TemplateMatch',
  template: 'template/StartUp/CloseAnnouncement.png',
  roi: [1105, 40, 143, 140],
  action: 'Click',
  next: [HomeLoading, HomeFlag, StartGame, CloseAnnouncement]
}

StartGame.$ = {
  recognition: 'TemplateMatch',
  template: 'template/StartUp/StartGame.png',
  roi: [517, 458, 242, 163],
  action: 'Click',
  next: [HomeLoading, HomeFlag, StartGame, CloseAnnouncement]
}

HomeLoading.$ = {
  recognition: 'TemplateMatch',
  template: 'template/StartUp/HomeLoading.png',
  roi: [459, 359, 364, 152],
  next: [HomeLoading, HomeFlag]
}

HomeFlag.$ = {
  recognition: 'TemplateMatch',
  template: 'template/StartUp/HomeFlag.png',
  roi: [1022, 419, 194, 166]
}

BackButton.$ = {
  recognition: 'TemplateMatch',
  template: [
    'template/StartUp/BackButton.png',
    'template/StartUp/BackButton_White.png'
  ],
  roi: [0, 0, 134, 138],
  action: 'Click',
  next: [HomeButton, BackButton, HomeFlag]
}

HomeButton.$ = {
  recognition: 'TemplateMatch',
  template: [
    'template/StartUp/HomeButton.png',
    'template/StartUp/HomeButton_White.png'
  ],
  roi: [70, 0, 144, 144],
  action: 'Click',
  next: [HomeButton, BackButton, HomeFlag]
}
