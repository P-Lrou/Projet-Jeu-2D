//& This file actually managed the player for the Engine One

//^ This function managed player input
function playerInputs() {
  let lastPosition = [mapX, mapY]

  Direction = [0, 0];
  playerState = "idle";

  if (keyIsDown(UP_ARROW) && canMovePlayer || keyIsDown(90) && canMovePlayer) {
    mapY -= playerSpeed;
    Direction[1] -= 1;
    playerState = "mooving";
  }

  if (keyIsDown(DOWN_ARROW) && canMovePlayer || keyIsDown(83) && canMovePlayer) {
    mapY += playerSpeed;
    Direction[1] += 1;
    playerState = "mooving";
  }

  if (keyIsDown(LEFT_ARROW) && canMovePlayer || keyIsDown(81) && canMovePlayer) {
    mapX -= playerSpeed;
    Direction[0] -= 1;
    playerState = "mooving";
  }

  if (keyIsDown(RIGHT_ARROW) && canMovePlayer || keyIsDown(68) && canMovePlayer) {
    mapX += playerSpeed;
    Direction[0] += 1;
    playerState = "mooving";
  }

  if (keyIsDown(49) && canMovePlayer) actualInventoryChoose = 1; // Keyboard 1 --> Set inventory slot selected to 1
  if (keyIsDown(50) && canMovePlayer) actualInventoryChoose = 2; // Keyboard 2 --> Set inventory slot selected to 2
  if (keyIsDown(51) && canMovePlayer) actualInventoryChoose = 3; // Keyboard 3 --> Set inventory slot selected to 3

  if (escapeIsPressed && canMovePlayer) {
    escapeIsPressed = false;
    canMovePlayer = false;
    canShowSettingsMenu = true;
    lastPostionAfterMenu = "engineOne"
    currentEngine = MENU;
  }

  madeCollision();

  // Specific collision, just put the player position on map and then it returns if yes or not there is a collision here
  if (checkSpecificCollision([mapX + playerPosX + spritePlayerSize / 2, mapY + playerPosY + spritePlayerSize / 2]) === true) { mapX = lastPosition[0]; mapY = lastPosition[1] }

}

//^ This function call the function to draw the player using the direction
function drawPlayer() {
  let TopCornerLeft = getTopCornerLeft([playerPosX + 28, playerPosY + 45, spritePlayerSize, spritePlayerSize,]);
  let TopCornerRight = getTopCornerRight([playerPosX, playerPosY + 45, spritePlayerSize - 28, spritePlayerSize,]);
  let BottomCornerLeft = getBottomCornerLeft([playerPosX + 28, playerPosY, spritePlayerSize - 40, spritePlayerSize + 8,]);
  let BottomCornerRight = getBottomCornerRight([playerPosX, playerPosY, spritePlayerSize - 28, spritePlayerSize + 8,]);

  // fill("red")
  // ellipse(TopCornerLeft[0], TopCornerLeft[1], 15)
  // fill("blue")
  // ellipse(TopCornerRight[0], TopCornerRight[1], 15)
  // fill("green")
  // ellipse(BottomCornerLeft[0], BottomCornerLeft[1], 15)
  // fill("yellow")
  // ellipse(BottomCornerRight[0], BottomCornerRight[1], 15)

  switch (playerState) {
    case "idle":
      drawIdlePlayer();
      break;
    case "mooving":
      drawMovePlayer();
      break;
    default:
      throw new Error("Player State isn't defined or isn't the good value");
  }

  if (checkIfIsObject(getTileNameForObject(TopCornerLeft))) {
    takeObject(TopCornerLeft);
  }
  if (checkIfIsObject(getTileNameForObject(TopCornerRight))) {
    takeObject(TopCornerRight);
  }
  if (checkIfIsObject(getTileNameForObject(BottomCornerLeft))) {
    takeObject(BottomCornerLeft);
  }
  if (checkIfIsObject(getTileNameForObject(BottomCornerRight))) {
    takeObject(BottomCornerRight);
  }

  if (getTileNameForObject(BottomCornerRight) === 198 || getTileNameForObject(BottomCornerLeft) === 198 || getTileNameForObject(TopCornerRight) === 198 || getTileNameForObject(TopCornerLeft) === 198) {
    canActiveDoorBool = true;
  }

  if (getTileNameForObject4(BottomCornerRight) === 259 || getTileNameForObject4(BottomCornerLeft) === 259 || getTileNameForObject4(TopCornerRight) === 259 || getTileNameForObject4(TopCornerLeft) === 259 ||
    getTileNameForObject4(BottomCornerRight) === 260 || getTileNameForObject4(BottomCornerLeft) === 260 || getTileNameForObject4(TopCornerRight) === 260 || getTileNameForObject4(TopCornerLeft) === 260) {
    canShowDoorMessage = true;
  }
}

//^ This function draw the player if he dont move
function drawIdlePlayer() {
  if (acteTwoIsStarting && !quests.goToCloneMapAfterSleep.haveGun) {
    image(mainCaracterDark.get(0, spriteCutSize * 3, spriteCutSize, spriteCutSize), playerPosX, playerPosY, spritePlayerSize, spritePlayerSize);
  } else if (!quests.goToCloneMapAfterSleep.haveGun) {
    image(mainCaracter.get(0, spriteCutSize * 3, spriteCutSize, spriteCutSize), playerPosX, playerPosY, spritePlayerSize, spritePlayerSize);
  }
  if (quests.goToCloneMapAfterSleep.haveGun) {
    image(mainCaracterDarkWeapon.get(0, spriteCutSize * 3, spriteCutSize, spriteCutSize), playerPosX, playerPosY, spritePlayerSize, spritePlayerSize);
  }
}

//^ This function draw the player if he move
function drawMovePlayer() {
  let animationMoovePlayer = undefined
  if (acteTwoIsStarting && !quests.goToCloneMapAfterSleep.haveGun) {
    animationMoovePlayer = mainCaracterDark.get(0, spriteCutSize * 3, spriteCutSize, spriteCutSize);
  } else if (!quests.goToCloneMapAfterSleep.haveGun) {
    animationMoovePlayer = mainCaracter.get(0, spriteCutSize * 3, spriteCutSize, spriteCutSize);
  }
  if (quests.goToCloneMapAfterSleep.haveGun) {
    animationMoovePlayer = mainCaracterDarkWeapon.get(0, spriteCutSize * 3, spriteCutSize, spriteCutSize);
  }

  switch (Direction[1]) {
    case 0:
      break;
    case 1:
      if (acteTwoIsStarting && !quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracterDark.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 3, spriteCutSize, spriteCutSize);
      } else if (!quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracter.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 3, spriteCutSize, spriteCutSize);
      }
      if (quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracterDarkWeapon.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 3, spriteCutSize, spriteCutSize);
      }
      break;
    case -1:
      if (acteTwoIsStarting && !quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracterDark.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 2, spriteCutSize, spriteCutSize);
      } else if (!quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracter.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 2, spriteCutSize, spriteCutSize);
      }
      if (quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracterDarkWeapon.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 2, spriteCutSize, spriteCutSize);
      }
      break;
  }

  switch (Direction[0]) {
    case 0:
      break;
    case 1:
      if (acteTwoIsStarting && !quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracterDark.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 0, spriteCutSize, spriteCutSize);
      } else if (!quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracter.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 0, spriteCutSize, spriteCutSize);
      }
      if (quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracterDarkWeapon.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 0, spriteCutSize, spriteCutSize);
      }
      break;
    case -1:
      if (acteTwoIsStarting && !quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracterDark.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 1, spriteCutSize, spriteCutSize);
      } else if (!quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracter.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 1, spriteCutSize, spriteCutSize);
      }
      if (quests.goToCloneMapAfterSleep.haveGun) {
        animationMoovePlayer = mainCaracterDarkWeapon.get(spriteCutSize * indexOfPlayerAnimation, spriteCutSize * 1, spriteCutSize, spriteCutSize);
      }
      break;
  }

  image(animationMoovePlayer, playerPosX, playerPosY, spritePlayerSize, spritePlayerSize);
}

//^ This function is used to check if the actual tile of the player is an tile with collision
//- Take in param the actualtile number
function checkIfIsCollisionWall(actualTile) {
  switch (actualTile) {
    case 1:
      return true;
    case 2:
      return true;
    case 3:
      return true;
    case 4:
      return true;
    case 5:
      return true;
    case 6:
      return true;
    case 7:
      return true;
    case 8:
      return true;
    case 9:
      return true;
    case 10:
      return true;
    case 11:
      return true;
    case 12:
      return true;
    case 14:
      return true;
    case 18:
      return true;
    case 19:
      return true;
    case 20:
      return true;
    case 24:
      return true;
    case 26:
      return true;
    case 30:
      return true;
    case 222:
      return true;
    case 216:
      return true;
    case 244:
      return true;
    case 245:
      return true;

    case 998:
      changeMap("clone");
      return false;
    case 999:
      changeMap("botanic");
      return false;
    case 997:
      changeMap("command");
      return false;
    case 996:
      changeMap("capsule");
      return false;
    case 995:
      changeMap("dorms");
      return false;

    default:
      return false;
  }
}

//^ This function is used to check if the actual tile of the player is an tile with an object that can be taked
//- Take in param the actualtile number
function checkIfIsObject(actualTile) {
  switch (actualTile) {
    default:
      return false;
  }
}

//^ This function is used to get the actual tile name for collision tiles
//- Take in param the player position point
function getTileName(point) {
  return map.layers[0][Math.trunc((point[1] + mapY) / tileSize)][Math.trunc((point[0] + mapX) / tileSize)];
}

//^ This functions are used to get the actual tile name for objects tiles in differents layers
//- Take in param the player position point
function getTileNameForObject(point) {
  return map.layers[1][Math.trunc((point[1] + mapY) / tileSize)][Math.trunc((point[0] + mapX) / tileSize)];
}

function getTileNameForObject2(point) {
  return map.layers[2][Math.trunc((point[1] + mapY) / tileSize)][Math.trunc((point[0] + mapX) / tileSize)];
}

function getTileNameForObject3(point) {
  return map.layers[3][Math.trunc((point[1] + mapY) / tileSize)][Math.trunc((point[0] + mapX) / tileSize)];
}

function getTileNameForObject4(point) {
  return map.layers[4][Math.trunc((point[1] + mapY) / tileSize)][Math.trunc((point[0] + mapX) / tileSize)];
}

//^ This function made the collision for the player
function madeCollision() {
  let TopCornerLeft = getTopCornerLeft([playerPosX + 28, playerPosY + 110, spritePlayerSize, spritePlayerSize,]);
  let TopCornerRight = getTopCornerRight([playerPosX, playerPosY + 110, spritePlayerSize - 28, spritePlayerSize,]);
  let BottomCornerLeft = getBottomCornerLeft([playerPosX + 28, playerPosY, spritePlayerSize - 40, spritePlayerSize + 8,]);
  let BottomCornerRight = getBottomCornerRight([playerPosX, playerPosY, spritePlayerSize - 28, spritePlayerSize + 8,]);
  if (debugMode) {
    fill(255, 0, 0, 60)
    noStroke();
    rect(playerPosX + 28, playerPosY + 60, spritePlayerSize - 60, spritePlayerSize - 54)
  }
  // fill("red")
  // ellipse(TopCornerLeft[0], TopCornerLeft[1], 15)
  // fill("blue")
  // ellipse(TopCornerRight[0], TopCornerRight[1], 15)
  // fill("green")
  // ellipse(BottomCornerLeft[0], BottomCornerLeft[1], 15)
  // fill("yellow")
  // ellipse(BottomCornerRight[0], BottomCornerRight[1], 15)

  if (checkIfIsCollisionWall(getTileName(TopCornerLeft)) || checkIfIsCollisionWall(getTileNameForObject(TopCornerLeft))) {
    if (Direction[0] === -1) {
      mapX += playerSpeed;
    } else if (Direction[1] === -1) {
      mapY += playerSpeed;
    }
  }
  if (checkIfIsCollisionWall(getTileName(TopCornerRight)) || checkIfIsCollisionWall(getTileNameForObject(TopCornerRight))) {
    if (Direction[0] === 1) {
      mapX -= playerSpeed;
    } else if (Direction[1] === -1) {
      mapY += playerSpeed;
    }
  }
  if (checkIfIsCollisionWall(getTileName(BottomCornerLeft)) || checkIfIsCollisionWall(getTileNameForObject(BottomCornerLeft))) {
    if (Direction[1] === 1) {
      mapY -= playerSpeed;
    } else if (Direction[0] === -1) {
      mapX += playerSpeed;
    }
  }
  if (checkIfIsCollisionWall(getTileName(BottomCornerRight)) || checkIfIsCollisionWall(getTileNameForObject(BottomCornerRight))) {
    if (Direction[1] === 1) {
      mapY -= playerSpeed;
    } else if (Direction[0] === 1) {
      mapX -= playerSpeed;
    }
  }

  if (getTileNameForObject2(BottomCornerRight) === 142 || getTileNameForObject2(BottomCornerLeft) === 142 || getTileNameForObject2(TopCornerRight) === 142 || getTileNameForObject2(TopCornerLeft) === 142
    || getTileNameForObject2(BottomCornerRight) === 143 || getTileNameForObject2(BottomCornerLeft) === 143 || getTileNameForObject2(TopCornerRight) === 143 || getTileNameForObject2(TopCornerLeft) === 143) {
    if (canMovePlayer) {
      actualChestStatusForWrench = true;
      canOpenChest = true;
    }
  }

  if (getTileNameForObject2(BottomCornerRight) === 154 || getTileNameForObject2(BottomCornerLeft) === 154 || getTileNameForObject2(TopCornerRight) === 154 || getTileNameForObject2(TopCornerLeft) === 154
    || getTileNameForObject2(BottomCornerRight) === 155 || getTileNameForObject2(BottomCornerLeft) === 155 || getTileNameForObject2(TopCornerRight) === 155 || getTileNameForObject2(TopCornerLeft) === 155) {
    if (canMovePlayer) {
      actualChestStatusForWrench = false;
      canOpenChest = true;
    }
  }

  if (getTileNameForObject2(BottomCornerRight) === 180 || getTileNameForObject2(BottomCornerLeft) === 180 || getTileNameForObject2(TopCornerRight) === 180 || getTileNameForObject2(TopCornerLeft) === 180) {
    if (canMovePlayer) {
      actualChestStatusForWrench = false;
      canOpenChest = true;
    }
  }

  if (getTileNameForObject3(BottomCornerRight) === 192 || getTileNameForObject3(BottomCornerLeft) === 192 || getTileNameForObject3(TopCornerRight) === 192 || getTileNameForObject3(TopCornerLeft) === 192
    || getTileNameForObject3(BottomCornerRight) === 186 || getTileNameForObject3(BottomCornerLeft) === 186 || getTileNameForObject3(TopCornerRight) === 186 || getTileNameForObject3(TopCornerLeft) === 186) {
    if (canMovePlayer) {
      canReadNote = true;
      actualNote = 0;
    }
  }

  if (getTileNameForObject3(BottomCornerRight) === 179 || getTileNameForObject3(BottomCornerLeft) === 179 || getTileNameForObject3(TopCornerRight) === 179 || getTileNameForObject3(TopCornerLeft) === 179) {
    if (canMovePlayer) {
      canReadNote = true;
      actualNote = 1;
    }
  }

  if (getTileNameForObject3(BottomCornerRight) === 173 || getTileNameForObject3(BottomCornerLeft) === 173 || getTileNameForObject3(TopCornerRight) === 173 || getTileNameForObject3(TopCornerLeft) === 173) {
    if (canMovePlayer) {
      canReadNote = true;
      actualNote = 2;
    }
  }
}

//^ This function is used to take an object and set him in the inventory
//- Take in param the player position point
function takeObject(point) {
  if (keyIsDown(69)) {
    image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
  } else {
    image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
  }
  if (eIsPressed && canMovePlayer) {
    eIsPressed = false;
    inventoryTab[inventoryTabNumber] = getTileNameForObject(point);
    inventoryTabNumber++;
    map.layers[1][Math.trunc((point[1] + mapY) / tileSize)][Math.trunc((point[0] + mapX) / tileSize)] = 0;
  }
}

//^ This function is used to change map from the first engine to the second
//- Take in param tha map wanted
function changeMap(map) {
  if (map === "clone") {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      actualMapEngineTwo = "cloneMap";
      actualDirectionEngineTwo = "left";
      EngineTwoMapX = -engineTwoMapSizeW * (screenHeight / engineTwoMapSizeH) + screenWidth;
      canDoTransition = true;
      canMovePlayer = false;
      newEngineSelected = ENGINE_TWO
      topDownMapBackgroundSoundIsActivated = false;
      playTopDownMapBackgroundSound();
      cloneMapBackgroundSoundIsActivated = true;
      playCloneMapBackgroundSound();
    }
  }
  if (map === "botanic") {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      actualMapEngineTwo = "botanicMap";
      actualDirectionEngineTwo = "rigth";
      EngineTwoMapX = 0;
      canDoTransition = true;
      canMovePlayer = false;
      newEngineSelected = ENGINE_TWO
      topDownMapBackgroundSoundIsActivated = false;
      playTopDownMapBackgroundSound();
      botanicMapBackgroundSoundIsActivated = true;
      playBotanicMapBackgroundSound();
    }
  }
  if (map === "command") {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      actualMapEngineTwo = "commandMap";
      actualDirectionEngineTwo = "left";
      EngineTwoMapX = -engineTwoMapSizeW * (screenHeight / engineTwoMapSizeH) + screenWidth;
      canDoTransition = true;
      canMovePlayer = false;
      newEngineSelected = ENGINE_TWO
      topDownMapBackgroundSoundIsActivated = false;
      playTopDownMapBackgroundSound();
      commmandMapBackgroundSoundIsActivated = true;
      playCommmandMapBackgroundSound();
    }
  }
  if (map === "capsule") {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      actualMapEngineTwo = "capsuleMap";
      actualDirectionEngineTwo = "left";
      EngineTwoMapX = -engineTwoMapSizeW * (screenHeight / engineTwoMapSizeH) + screenWidth;
      canDoTransition = true;
      canMovePlayer = false;
      newEngineSelected = ENGINE_TWO
      topDownMapBackgroundSoundIsActivated = false;
      playTopDownMapBackgroundSound();
      capsuleMapBackgroundSoundIsActivated = true;
      playCapsuleMapBackgroundSound();
    }
  }
  if (map === "dorms") {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      actualMapEngineTwo = "dormsMap";
      actualDirectionEngineTwo = "left";
      EngineTwoMapX = -engineTwoMapSizeW * (screenHeight / engineTwoMapSizeH) + screenWidth;
      canDoTransition = true;
      canMovePlayer = false;
      newEngineSelected = ENGINE_TWO
      topDownMapBackgroundSoundIsActivated = false;
      playTopDownMapBackgroundSound();
      dormsMapBackgroundSoundIsActivated = true;
      playDormsMapBackgroundSound()
    }
  }
}

//^ This function set the chest open condition and the action to open them
function openChest() {
  if (canOpenChest) {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      if (quests.repareCapsulesMap.canTakeWrench && actualQuestName === "repareCapsulesMap") {
        if (actualChestStatusForWrench) {
          actualDialog = moreInteractionJSON.chestInteractions[4];
          actualPlayersOrder = moreInteractionJSON.chestInteractions[5];
          canInteract = true;
          canMovePlayer = false;
          canTalkGlobalNPC = false;
          canMoveAllNPC = false;
          canDrawMenus = false;
          quests.repareCapsulesMap.canAddWrenchToInventory = true
          quests.repareCapsulesMap.wrenchIsTaked = true;
        } else {
          actualDialog = moreInteractionJSON.chestInteractions[2];
          actualPlayersOrder = moreInteractionJSON.chestInteractions[3];
          canInteract = true;
          canMovePlayer = false;
          canTalkGlobalNPC = false;
          canMoveAllNPC = false;
          canDrawMenus = false;
        }
      } else if (quests.repareCapsulesMap.wrenchIsTaked) {
        actualDialog = moreInteractionJSON.chestInteractions[2];
        actualPlayersOrder = moreInteractionJSON.chestInteractions[3];
        canInteract = true;
        canMovePlayer = false;
        canTalkGlobalNPC = false;
        canMoveAllNPC = false;
        canDrawMenus = false;
      } else {
        actualDialog = moreInteractionJSON.chestInteractions[0];
        actualPlayersOrder = moreInteractionJSON.chestInteractions[1];
        canInteract = true;
        canMovePlayer = false;
        canTalkGlobalNPC = false;
        canMoveAllNPC = false;
        canDrawMenus = false;
      }
    }
  }
  canOpenChest = false;
}

//^ This function set the notes open condition and the action to open them
function showNotes() {
  if (canReadNote) {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      canMovePlayer = false;
      canTalkGlobalNPC = false;
      canMoveAllNPC = false;
      canDrawMenus = false;
      canShowNotes = true;
    }
  }
  if (canShowNotes) {
    if (actualNote === 0) {
      image(note0, screenWidth / 2 - 300, 18, 600, 882);
    }
    if (actualNote === 1) {
      image(note1, screenWidth / 2 - 300, 18, 600, 882);
    }
    if (actualNote === 2) {
      image(note2, screenWidth / 2 - 300, 18, 600, 882);
    }
    if (eIsPressed && !canMovePlayer) {
      eIsPressed = false;
      canReadNote = false;
      canMovePlayer = true;
      canTalkGlobalNPC = true;
      canMoveAllNPC = true;
      canDrawMenus = true;
      canShowNotes = false;
    }
  }
  canReadNote = false;
}

//^ This function set the doors open condition and the action to open them
function canActiveDoor() {
  if (acteTwoIsStarting && quests.goToCloneMapAfterSleep.haveCard && canActiveDoorBool && canMovePlayer) {
    if (mapX > 2500) {
      if (keyIsDown(69)) {
        image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
      } else {
        image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
      }
      if (eIsPressed && canMovePlayer) {
        eIsPressed = false;
        canMovePlayer = false;
        canTalkGlobalNPC = false;
        canMoveAllNPC = false;
        canDrawMenus = false;
        actualDialog = moreInteractionJSON.doors[0];;
        actualPlayersOrder = moreInteractionJSON.doors[1];
        canActiveDoorBool = false;
        canInteract = true;
      }
    } else {
      if (keyIsDown(69)) {
        image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
      } else {
        image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
      }
      if (eIsPressed && canMovePlayer) {
        eIsPressed = false;
        removeFromInventory("card")
        leftDoorsAreClosed = false;
        canActiveDoorBool = false;
        quests.goToCloneMapAfterSleep.haveCard = false;
        quests.fight.animationFightCanStart = true;
      }
    }
  }
  canActiveDoorBool = false;
}

//^ This function detect if the player is after a point and show more information in the top down map during the alert
function showMoreInformationsAboutAlert() {
  if (quests.goToCloneMapAfterSleep.goToCloneMapAfterSleepIsStarted && quests.goToCloneMapAfterSleep.canShowMoreInformationAboutAlert && canMovePlayer) {
    if (mapX > 630) {
      canMovePlayer = false;
      canTalkGlobalNPC = false;
      canMoveAllNPC = false;
      canDrawMenus = false;
      actualDialog = moreInteractionJSON.doors[2];;
      actualPlayersOrder = moreInteractionJSON.doors[3];
      canActiveDoorBool = false;
      canInteract = true;
    }
  }
}

//^This function is used to show doors message in different story moment
function showDoorMessage() {
  if (canShowDoorMessage && leftDoorsAreClosed && !quests.goToCloneMapAfterSleep.haveCard) {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      canMovePlayer = false;
      canTalkGlobalNPC = false;
      canMoveAllNPC = false;
      canDrawMenus = false;
      actualDialog = moreInteractionJSON.doors[6];
      actualPlayersOrder = moreInteractionJSON.doors[7];
      canActiveDoorBool = false;
      canInteract = true;
    }
  }
  if (canShowDoorMessage && leftDoorsAreClosed && quests.goToCloneMapAfterSleep.haveCard) {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      canMovePlayer = false;
      canTalkGlobalNPC = false;
      canMoveAllNPC = false;
      canDrawMenus = false;
      actualDialog = moreInteractionJSON.doors[4];
      actualPlayersOrder = moreInteractionJSON.doors[5];
      canActiveDoorBool = false;
      canInteract = true;
    }
  }
  if (canShowDoorMessage && rigthDoorsAreClosed && !leftDoorsAreClosed && !quests.goToCloneMapAfterSleep.haveCard) {
    if (keyIsDown(69)) {
      image(interactionButton.get(14, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    } else {
      image(interactionButton.get(0, 0, 14, 15), playerPosX + 45, playerPosY - 50, 42, 45);
    }
    if (eIsPressed && canMovePlayer) {
      eIsPressed = false;
      canMovePlayer = false;
      canTalkGlobalNPC = false;
      canMoveAllNPC = false;
      canDrawMenus = false;
      actualDialog = moreInteractionJSON.doors[0];;
      actualPlayersOrder = moreInteractionJSON.doors[1];
      canActiveDoorBool = false;
      canInteract = true;
    }
  }
  canShowDoorMessage = false;
}