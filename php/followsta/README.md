# FollowSta

Liste your instagram followers and generate a differential between followers that follow you back and ones that doesn't.

## 🔋 Poweredby

  * Slim Skeleton

## 🔧 Prerequisites

First of all, you need to have the following tools installed globally on your environment:

  * composer
  * yarn

## 🚛 Install

1. Setup your virtualhost (like `http://followsta.dev`) to serve `/public`.

2. Install dependencies using composer

  ```bash
  $ composer install
  ```

## 🎨 Build the theme

1. You first need to setup the work environment by running `$ yarn install`.

  ```bash
  $ yarn install --modules-folder ./public/node_modules
  ```

## 🚀 Deploy

Soon

## 🚑 Troubleshootings

### Run quick & dirty server

  ```bash
  $ php -S 0.0.0.0:8081 -t public public/index.php
  ```