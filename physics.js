// Class Declaration
class object {
    constructor(newPositionX, newPositionY, newVelocityX, newVelocityY, newAccelerationX, newAccelerationY) {
        this.name = "object" + (objectCount),
        this.element = document.getElementById("object" + (objectCount)),
        this.positionX = newPositionX,
        this.positionY = newPositionY,
        this.velocityX = newVelocityX,
        this.velocityY = newVelocityY,
        this.accelerationX = newAccelerationX,
        this.accelerationY = newAccelerationY,
        this.onGroundAccelerationSet = false,
        this.onGround = false,
        this.onLeftWall = false,
        this.onRightWall = false,
        this.onCeiling = false,
        this.currentDirectionX = 0,
        this.fixed = false
    }
}
class arrow {
    constructor() {
        this.element = document.getElementById("arrow" + objectCount),
        this.scale = 1,
        this.rotation = 0,
        this.top = 0,
        this.left = 0
    }
}

// Object Declaration
var object1 = {
    name: "object1",
    element: document.getElementById("object1"),
    positionX: 1700,
    positionY: 190,
    velocityX: 0,
    velocityY: 0,
    accelerationX: 0,
    accelerationY: 981,
    onGroundAccelerationSet: false,
    onGround: false,
    onLeftWall: false,
    onRightWall: false,
    onCeiling: false,
    currentDirectionX: 0,
    fixed: false,
}
var arrow1 = {
    element: document.getElementById("arrow1"),
    scale: 1,
    rotation: 0,
    top: 0,
    left: 0,
}
var object2 = {
    name: "object2",
    element: document.getElementById("object2"),
    positionX: 1700,
    positionY: 390,
    velocityX: 0,
    velocityY: 0,
    accelerationX: 0,
    accelerationY: 981,
    onGroundAccelerationSet: false,
    onGround: false,
    currentDirectionX: 0,
    fixed: false,
}
var arrow2 = {
    element: document.getElementById("arrow2"),
    scale: 1,
    rotation: 0,
    top: 0,
    left: 0,
}
var object3 = {
    name: "object3",
    element: document.getElementById("object3"),
    positionX: 1700,
    positionY: 590,
    velocityX: 0,
    velocityY: 0,
    accelerationX: 0,
    accelerationY: 981,
    onGroundAccelerationSet: false,
    onGround: false,
    currentDirectionX: 0,
    fixed: false,
}
var arrow3 = {
    element: document.getElementById("arrow3"),
    scale: 1,
    rotation: 0,
    top: 0,
    left: 0,
}
var object4 = {
    name: "object4",
    element: document.getElementById("object4"),
    positionX: 1700,
    positionY: 790,
    velocityX: 0,
    velocityY: 0,
    accelerationX: 0,
    accelerationY: 981,
    onGroundAccelerationSet: false,
    onGround: false,
    currentDirectionX: 0,
    fixed: false,
}
var arrow4 = {
    element: document.getElementById("arrow4"),
    scale: 1,
    rotation: 0,
    top: 0,
    left: 0,
}

// Variable Declaration
var timePaused = true;
var objectCount = 4;
var coefficientOfFriction = 2;
var currentObject;
var currentArrow;
var secondTargetObject;
var ceiling;
var tempPosition;
var tempOffset;
var deltaLeft;
var deltaTop;
var deltaRight;
var deltaBottom;
var ignoreCollision = false;
var framesPerSecond = 100;
var timePerFrame = 1000 / framesPerSecond;
var gravityOn = true;
var gravityObject;

// New Object Function
function newObject(newPositionX, newPositionY, newVelocityX, newVelocityY, newAccelerationX, newAccelerationY) {
    objectCount += 1;
    tempElement = document.createElement("div");
    tempElement.classList.add("object");
    tempElement.classList.add("square-1");
    tempElement.id = "object" + (objectCount);
    document.getElementById("physics-field").appendChild(tempElement);
    
    tempElement = document.createElement("div");
    tempElement.classList.add("movePosition");
    tempElement.id = "object" + (objectCount) + "header";
    document.getElementById("object" + objectCount).appendChild(tempElement);
    
    tempElement = document.createElement("img");
    tempElement.classList.add("lock");
    tempElement.id = "lock" + (objectCount);
    tempElement.src = "./lock.png";
    document.getElementById("object" + objectCount).appendChild(tempElement);
    
    tempElement = document.createElement("div");
    tempElement.classList.add("arrow");
    tempElement.id = "arrow" + (objectCount);
    document.getElementById("physics-field").appendChild(tempElement);
    
    dragElement(document.getElementById("object" + objectCount));
}

// Physics Functions
function physics() {
    for (j = 1; j <= objectCount; j++) {
        currentObject = eval("object" + j);
        if (currentObject.fixed !== true && movingObject !== currentObject) {
            currentArrow = eval("arrow" + j);
            if (parseFloat(window.getComputedStyle(currentObject.element).left) + currentObject.element.offsetWidth + currentObject.velocityX / framesPerSecond > window.innerWidth) {
                currentObject.positionX = window.innerWidth - currentObject.element.offsetWidth;
                currentObject.velocityX = 0;
            } else if (parseFloat(window.getComputedStyle(currentObject.element).left) + currentObject.velocityX / framesPerSecond < 0) {
                currentObject.positionX = 0;
                currentObject.velocityX = 0;
            } else {
                currentObject.positionX += currentObject.velocityX / framesPerSecond;
                currentObject.velocityX += currentObject.accelerationX / framesPerSecond;
            }
            if (parseFloat(window.getComputedStyle(currentObject.element).top) + currentObject.element.offsetHeight + currentObject.velocityY / framesPerSecond > window.innerHeight || currentObject.onGround === true) {
                currentObject.positionY = window.innerHeight - currentObject.element.offsetHeight;
                currentObject.velocityY = 0;
                currentObject.onGround = true;
            } else if (parseFloat(window.getComputedStyle(currentObject.element).top) + currentObject.velocityY / framesPerSecond < ceiling) {
                currentObject.positionY = ceiling;
                currentObject.velocityY = 0;
            } else {
                currentObject.positionY += currentObject.velocityY / framesPerSecond;
                currentObject.velocityY += currentObject.accelerationY / framesPerSecond;
            }
            if (currentObject.onGround === true && Math.sign(currentObject.velocityX) !== 0) {
                if (currentObject.currentDirectionX !== Math.sign(currentObject.velocityX) && currentObject.currentDirectionX !== 0) {
                    currentObject.velocityX = 0;
                    currentObject.accelerationX = 0;
                    currentObject.currentDirectionX = 0;
                    currentObject.onGroundAccelerationSet = false;
                    return;
                } else {
                    currentObject.currentDirectionX = Math.sign(currentObject.velocityX);
                    if (currentObject.onGroundAccelerationSet === false) {
                        currentObject.accelerationX += (coefficientOfFriction * currentObject.accelerationY * -1 * Math.sign(currentObject.velocityX));
                        currentObject.onGroundAccelerationSet = true;
                    }
                }
            }
            if (Math.abs(currentObject.velocityY) < 10 && gravityOn === false) {
                currentObject.velocityY = 0;
            }
        }
        if (popupContent === "matrix" && popupObject === currentObject && popupObject !== undefined) {
            setMatrix(popupObject);
        }
    }
    drawObjects();
    drawArrows();
    detectCollision();
}
function detectCollision() {
    
        for (l = 1; l <= objectCount; l ++) {

            targetObject = eval("object" + l);

            for (m = l + 1; m <= objectCount; m++) {

                secondTargetObject = eval("object" + m);
                // Check for collision
                if (targetObject.positionX <= secondTargetObject.positionX + secondTargetObject.element.offsetWidth && targetObject.positionX + targetObject.element.offsetWidth >= secondTargetObject.positionX && targetObject.positionY <= secondTargetObject.positionY + secondTargetObject.element.offsetHeight && targetObject.positionY + targetObject.element.offsetHeight >= secondTargetObject.positionY) {

                    // Determine if collision is on right (true) or left (false)
                    if (targetObject.positionX + targetObject.element.offsetWidth >= secondTargetObject.positionX && targetObject.positionX + targetObject.element.offsetWidth < secondTargetObject.positionX + secondTargetObject.element.offsetWidth) {

                        // Determine if collision is on bottom (true) or top (false)
                        if (targetObject.positionY + targetObject.element.offsetHeight >= secondTargetObject.positionY && targetObject.positionY + targetObject.element.offsetHeight < secondTargetObject.positionY + secondTargetObject.element.offsetHeight) {

                            // Determine collision side based on proximity => right (true) or bottom (false)
                            if (Math.abs(targetObject.positionX + targetObject.element.offsetWidth - secondTargetObject.positionX) < Math.abs(targetObject.positionY + targetObject.element.offsetHeight - secondTargetObject.positionY)) {

                                // Right

                                if (targetObject.fixed === true) {
                                    secondTargetObject.positionX += (targetObject.positionX + targetObject.element.offsetWidth - secondTargetObject.positionX);
                                    targetObject.velocityX = 0;
                                    secondTargetObject.velocityX = 0;

                                } else if (secondTargetObject.fixed === true) {
                                    targetObject.positionX -= (targetObject.positionX + targetObject.element.offsetWidth - secondTargetObject.positionX);
                                    targetObject.velocityX = 0;
                                    secondTargetObject.velocityX = 0;
                                } else {

                                    // Set object positions outside of each other
                                    tempOffset = Math.abs(targetObject.positionX + targetObject.element.offsetWidth - secondTargetObject.positionX) / 2;
                                    targetObject.positionX -= tempOffset;
                                    secondTargetObject.positionX += tempOffset;

                                    // Make sure neither of the objects got pushed inside a wall (and fix them if they did)
                                    if (secondTargetObject.positionX + secondTargetObject.element.offsetWidth > window.innerWidth) {

                                        // Set tempPosition to the difference in width
                                        tempPosition = secondTargetObject.positionX + secondTargetObject.element.offsetWidth - window.innerWidth;

                                        // Set outer object back inbounds
                                        secondTargetObject.positionX = window.innerWidth - secondTargetObject.element.offsetWidth;

                                        // Adjust inner object to account for outer object
                                        targetObject.positionX -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityX -= tempPosition * framesPerSecond + tempOffset * framesPerSecond;
                                        secondTargetObject.velocityX = 0;

                                    } else if (targetObject.positionX < 0) {

                                        // Set tempPosition to the difference in width
                                        tempPosition = targetObject.positionX;

                                        // Set outer object back inbounds
                                        targetObject.positionX = 0;

                                        // Adjust inner object to account for outer object
                                        secondTargetObject.positionX -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityX = 0;
                                        secondTargetObject.velocityX -= tempPosition * framesPerSecond - tempOffset * framesPerSecond;

                                    } else {

                                        // Set velocities of objects if neither block went into a wall
                                        targetObject.velocityX -= tempOffset * framesPerSecond;
                                        secondTargetObject.velocityX += tempOffset * framesPerSecond;

                                    }

                                }
                                targetObject.onGroundAccelerationSet = false;
                                secondTargetObject.onGroundAccelerationSet = false;
                            } else {

                                // Bottom

                                if (targetObject.fixed === true) {
                                    secondTargetObject.positionY = targetObject.positionY + targetObject.element.offsetHeight;
                                    targetObject.velocityY = 0;
                                    secondTargetObject.velocityY = secondTargetObject.accelerationY / framesPerSecond;
                                } else if (secondTargetObject.fixed === true) {
                                    targetObject.positionY = secondTargetObject.positionY - targetObject.element.offsetHeight;
                                    targetObject.velocityY = targetObject.accelerationY / framesPerSecond;
                                    secondTargetObject.velocityY = 0;
                                } else {
                                    
                                    // Set object positions outside of each other
                                    tempOffset = Math.abs(targetObject.positionY + targetObject.element.offsetHeight - secondTargetObject.positionY) / 2;
                                    targetObject.positionY -= tempOffset;
                                    secondTargetObject.positionY += tempOffset;

                                    // Make sure neither of the objects got pushed inside a wall (and fix them if they did)
                                    if (targetObject.positionY - ceiling < 0) {

                                        // Set tempPosition to the difference in height
                                        tempPosition = targetObject.positionY - ceiling;

                                        // Set outer object back inbounds
                                        targetObject.positionY = ceiling;

                                        // Adjust inner object to account for outer object
                                        secondTargetObject.positionY -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityY = 0;
                                        secondTargetObject.velocityY -= tempPosition * framesPerSecond - tempOffset * framesPerSecond;

                                    } else if (secondTargetObject.positionY + secondTargetObject.element.offsetHeight > window.innerHeight) {

                                        // Set tempPosition to the difference in height
                                        tempPosition = secondTargetObject.positionY + secondTargetObject.element.offsetHeight - window.innerHeight;

                                        // Set outer object back inbounds
                                        secondTargetObject.positionY = window.innerHeight - secondTargetObject.element.offsetHeight;

                                        // Adjust inner object to account for outer object
                                        targetObject.positionY -= tempPosition;

                                        // Adjust the velocities to match
                                        secondTargetObject.velocityY = 0;
                                        targetObject.velocityY -= tempOffset * framesPerSecond + tempPosition * framesPerSecond;

                                    } else {

                                        // Set velocities of objects if neither block went into a wall
                                        targetObject.velocityY -= tempOffset * framesPerSecond;
                                        secondTargetObject.velocityY += tempOffset * framesPerSecond;
                                    }
                                }
                            }
                        } else {

                            // Determine collision side based on proximity => right (true) or top (false)
                            if (Math.abs(targetObject.positionX + targetObject.element.offsetWidth - secondTargetObject.positionX) < Math.abs(targetObject.positionY - secondTargetObject.positionY - secondTargetObject.element.offsetHeight)) {

                                // Right

                                if (targetObject.fixed === true) {
                                    secondTargetObject.positionX += (targetObject.positionX + targetObject.element.offsetWidth - secondTargetObject.positionX);
                                    targetObject.velocityX = 0;
                                    secondTargetObject.velocityX = 0;

                                } else if (secondTargetObject.fixed === true) {
                                    targetObject.positionX -= (targetObject.positionX + targetObject.element.offsetWidth - secondTargetObject.positionX);
                                    targetObject.velocityX = 0;
                                    secondTargetObject.velocityX = 0;
                                } else {

                                    // Set object positions outside of each other
                                    tempOffset = Math.abs(targetObject.positionX + targetObject.element.offsetWidth - secondTargetObject.positionX) / 2;
                                    targetObject.positionX -= tempOffset;
                                    secondTargetObject.positionX += tempOffset;

                                    // Make sure neither of the objects got pushed inside a wall (and fix them if they did)
                                    if (secondTargetObject.positionX + secondTargetObject.element.offsetWidth > window.innerWidth) {

                                        // Set tempPosition to the difference in width
                                        tempPosition = secondTargetObject.positionX + secondTargetObject.element.offsetWidth - window.innerWidth;

                                        // Set outer object back inbounds
                                        secondTargetObject.positionX = window.innerWidth - secondTargetObject.element.offsetWidth;

                                        // Adjust inner object to account for outer object
                                        targetObject.positionX -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityX -= tempPosition * framesPerSecond + tempOffset * framesPerSecond;
                                        secondTargetObject.velocityX = 0;

                                    } else if (targetObject.positionX < 0) {

                                        // Set tempPosition to the difference in width
                                        tempPosition = targetObject.positionX;

                                        // Set outer object back inbounds
                                        targetObject.positionX = 0;

                                        // Adjust inner object to account for outer object
                                        secondTargetObject.positionX -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityX = 0;
                                        secondTargetObject.velocityX -= tempPosition * framesPerSecond - tempOffset * framesPerSecond;

                                    } else {

                                        // Set velocities of objects if neither block went into a wall
                                        targetObject.velocityX -= tempOffset * framesPerSecond;
                                        secondTargetObject.velocityX += tempOffset * framesPerSecond;

                                    }

                                }
                                targetObject.onGroundAccelerationSet = false;
                                secondTargetObject.onGroundAccelerationSet = false;
                            } else {

                                // Top

                                if (targetObject.fixed === true) {
                                    secondTargetObject.positionY = targetObject.positionY - secondTargetObject.element.offsetHeight;
                                    targetObject.velocityY = 0;
                                    secondTargetObject.velocityY = secondTargetObject.accelerationY / framesPerSecond;

                                } else if (secondTargetObject.fixed === true) {
                                    targetObject.positionY = secondTargetObject.positionY + secondTargetObject.element.offsetHeight;
                                    targetObject.velocityY = targetObject.accelerationY / framesPerSecond;
                                    secondTargetObject.velocityY = 0;
                                } else {

                                    // Set object positions outside of each other
                                    tempOffset = Math.abs(targetObject.positionY - secondTargetObject.positionY - secondTargetObject.element.offsetHeight) / 2;
                                    targetObject.positionY += tempOffset;
                                    secondTargetObject.positionY -= tempOffset;

                                    // Make sure neither of the objects got pushed inside a wall (and fix them if they did)
                                    if (targetObject.positionY + targetObject.element.offsetHeight > window.innerHeight) {

                                        // Set tempPosition to the difference in height
                                        tempPosition = targetObject.positionY + targetObject.element.offsetHeight - window.innerHeight

                                        // Set outer object back inbounds
                                        targetObject.positionY = window.innerHeight - targetObject.element.offsetHeight;

                                        // Adjust inner object to account for outer object
                                        secondTargetObject.positionY -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityY = 0;
                                        secondTargetObject.velocityY -= tempOffset * framesPerSecond + tempPosition * framesPerSecond;
                                        
                                    } else if (secondTargetObject.positionY - ceiling < 0) {

                                        // Set tempPosition to the difference in height
                                        tempPosition = secondTargetObject.positionY - ceiling;

                                        // Set outer object back inbounds
                                        secondTargetObject.positionY = ceiling;

                                        // Adjust inner object to account for outer object
                                        targetObject.positionY -= tempPosition;

                                        // Adjust the velocities to match
                                        secondTargetObject.velocityY = 0;
                                        targetObject.velocityY += tempOffset * framesPerSecond - tempPosition * framesPerSecond;

                                    } else {

                                        // Set velocities of objects if neither block went into a wall
                                        targetObject.velocityY += tempOffset * framesPerSecond;
                                        secondTargetObject.velocityY -= tempOffset * framesPerSecond;
                                    }

                                }
                            }
                        }
                    } else {

                        //Determine if collision is on bottom (true) or top (false)
                        if (targetObject.positionY + targetObject.element.offsetHeight >= secondTargetObject.positionY && targetObject.positionY + targetObject.element.offsetHeight < secondTargetObject.positionY + secondTargetObject.element.offsetHeight) {

                            // Determine collision side based on proximity => left (true) or bottom (false)
                            if (Math.abs(targetObject.positionX - secondTargetObject.positionX - secondTargetObject.element.offsetHeight) < Math.abs(targetObject.positionY + targetObject.element.offsetHeight - secondTargetObject.positionY)) {

                                // Left

                                if (targetObject.fixed === true) {
                                    secondTargetObject.positionX = targetObject.positionX - secondTargetObject.element.offsetWidth;
                                    targetObject.velocityX = 0;
                                    secondTargetObject.velocityX = 0;

                                } else if (secondTargetObject.fixed === true) {
                                    targetObject.positionX = secondTargetObject.positionX + secondTargetObject.element.offsetWidth;
                                    targetObject.velocityX = 0;
                                    secondTargetObject.velocityX = 0;
                                } else {

                                    // Set object positions outside of each other
                                    tempOffset = Math.abs(targetObject.positionX - secondTargetObject.positionX - secondTargetObject.element.offsetHeight) / 2;
                                    targetObject.positionX += tempOffset;
                                    secondTargetObject.positionX -= tempOffset;

                                    // Make sure neither of the objects got pushed inside a wall (and fix them if they did)
                                    if (targetObject.positionX + targetObject.element.offsetWidth > window.innerWidth) {

                                        // Set tempPosition to the difference in width
                                        tempPosition = targetObject.positionX + targetObject.element.offsetWidth - window.innerWidth;

                                        // Set outer object back inbounds
                                        targetObject.positionX = window.innerWidth - targetObject.element.offsetWidth;

                                        // Adjust inner object to account for outer object
                                        secondTargetObject.positionX -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityX = 0;
                                        secondTargetObject.velocityX -= tempOffset * framesPerSecond + tempPosition * framesPerSecond;  

                                    } else if (secondTargetObject.positionX < 0) {

                                        // Set tempPosition to the difference in width
                                        tempPosition = secondTargetObject.positionX;

                                        // Set outer object back inbounds
                                        secondTargetObject.positionX = 0;

                                        // Adjust inner object to account for outer object
                                        targetObject.positionX -= tempPosition;

                                        // Adjust the velocities to match
                                        secondTargetObject.velocityX = 0;
                                        targetObject.velocityX += tempOffset * framesPerSecond - tempPosition * framesPerSecond;

                                    } else {

                                        // Set velocities of objects
                                        targetObject.velocityX += tempOffset * framesPerSecond;
                                        secondTargetObject.velocityX -= tempOffset * framesPerSecond;
                                    }

                                }
                                targetObject.onGroundAccelerationSet = false;
                                secondTargetObject.onGroundAccelerationSet = false;
                            } else {

                                // Bottom

                                if (targetObject.fixed === true) {
                                    secondTargetObject.positionY = (targetObject.positionY + targetObject.element.offsetHeight);
                                    targetObject.velocityY = 0;
                                    secondTargetObject.velocityY = secondTargetObject.accelerationY / framesPerSecond;
                                } else if (secondTargetObject.fixed === true) {
                                    targetObject.positionY = (secondTargetObject.positionY - targetObject.element.offsetHeight);
                                    targetObject.velocityY = targetObject.accelerationY / framesPerSecond;
                                    secondTargetObject.velocityY = 0;
                                } else {

                                    // Set object positions outside of each other
                                    tempOffset = Math.abs(targetObject.positionY + targetObject.element.offsetHeight - secondTargetObject.positionY) / 2;
                                    targetObject.positionY -= tempOffset;
                                    secondTargetObject.positionY += tempOffset;

                                    // Make sure neither of the objects got pushed inside a wall (and fix them if they did)
                                    if (targetObject.positionY - ceiling < 0) {

                                        // Set tempPosition to the difference in height
                                        tempPosition = targetObject.positionY - ceiling;

                                        // Set outer object back inbounds
                                        targetObject.positionY = ceiling;

                                        // Adjust inner object to account for outer object
                                        secondTargetObject.positionY -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityY = 0;
                                        secondTargetObject.velocityY -= tempPosition * framesPerSecond - tempOffset * framesPerSecond;

                                    } else if (secondTargetObject.positionY + secondTargetObject.element.offsetHeight > window.innerHeight) {

                                        // Set tempPosition to the difference in height
                                        tempPosition = secondTargetObject.positionY + secondTargetObject.element.offsetHeight - window.innerHeight;

                                        // Set outer object back inbounds
                                        secondTargetObject.positionY = window.innerHeight - secondTargetObject.element.offsetHeight;

                                        // Adjust inner object to account for outer object
                                        targetObject.positionY -= tempPosition;

                                        // Adjust the velocities to match
                                        secondTargetObject.velocityY = 0;
                                        targetObject.velocityY -= tempOffset * framesPerSecond + tempPosition * framesPerSecond;

                                    } else {

                                        // Set velocities of objects if neither block went into a wall
                                        targetObject.velocityY -= tempOffset * framesPerSecond;
                                        secondTargetObject.velocityY += tempOffset * framesPerSecond;
                                    }

                                }
                            }
                        } else {
                            // Determine collision side based on proximity => left (true) or top (false)
                            if (Math.abs(targetObject.positionX - secondTargetObject.positionX - secondTargetObject.element.offsetHeight) < Math.abs(targetObject.positionY - secondTargetObject.positionY - secondTargetObject.element.offsetHeight)) {

                                // Left

                                if (targetObject.fixed === true) {
                                    secondTargetObject.positionX = targetObject.positionX - secondTargetObject.element.offsetWidth;
                                    targetObject.velocityX = 0;
                                    secondTargetObject.velocityX = 0;

                                } else if (secondTargetObject.fixed === true) {
                                    targetObject.positionX = secondTargetObject.positionX + secondTargetObject.element.offsetWidth;
                                    targetObject.velocityX = 0;
                                    secondTargetObject.velocityX = 0;
                                } else {

                                    // Set object positions outside of each other
                                    tempOffset = Math.abs(targetObject.positionX - secondTargetObject.positionX - secondTargetObject.element.offsetHeight) / 2;
                                    targetObject.positionX += tempOffset;
                                    secondTargetObject.positionX -= tempOffset;

                                    // Make sure neither of the objects got pushed inside a wall (and fix them if they did)
                                    if (targetObject.positionX + targetObject.element.offsetWidth > window.innerWidth) {

                                        // Set tempPosition to the difference in width
                                        tempPosition = targetObject.positionX + targetObject.element.offsetWidth - window.innerWidth;

                                        // Set outer object back inbounds
                                        targetObject.positionX = window.innerWidth - targetObject.element.offsetWidth;

                                        // Adjust inner object to account for outer object
                                        secondTargetObject.positionX -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityX = 0;
                                        secondTargetObject.velocityX -= tempOffset * framesPerSecond + tempPosition * framesPerSecond;  

                                    } else if (secondTargetObject.positionX < 0) {

                                        // Set tempPosition to the difference in width
                                        tempPosition = secondTargetObject.positionX;

                                        // Set outer object back inbounds
                                        secondTargetObject.positionX = 0;

                                        // Adjust inner object to account for outer object
                                        targetObject.positionX -= tempPosition;

                                        // Adjust the velocities to match
                                        secondTargetObject.velocityX = 0;
                                        targetObject.velocityX += tempOffset * framesPerSecond - tempPosition * framesPerSecond;

                                    } else {

                                        // Set velocities of objects
                                        targetObject.velocityX += tempOffset * framesPerSecond;
                                        secondTargetObject.velocityX -= tempOffset * framesPerSecond;
                                    }

                                }
                                targetObject.onGroundAccelerationSet = false;
                                secondTargetObject.onGroundAccelerationSet = false;
                            } else {

                                // Top

                                 if (targetObject.fixed === true) {
                                    secondTargetObject.positionY = targetObject.positionY - secondTargetObject.element.offsetHeight;
                                    targetObject.velocityY = 0;
                                    secondTargetObject.velocityY = secondTargetObject.accelerationY / framesPerSecond;

                                } else if (secondTargetObject.fixed === true) {
                                    targetObject.positionY = secondTargetObject.positionY + secondTargetObject.element.offsetHeight;
                                    targetObject.velocityY = targetObject.accelerationY / framesPerSecond;
                                    secondTargetObject.velocityY = 0;
                                } else {

                                    // Set object positions outside of each other
                                    tempOffset = Math.abs(targetObject.positionY - secondTargetObject.positionY - secondTargetObject.element.offsetHeight) / 2;
                                    targetObject.positionY += tempOffset;
                                    secondTargetObject.positionY -= tempOffset;

                                    // Make sure neither of the objects got pushed inside a wall (and fix them if they did)
                                    if (targetObject.positionY + targetObject.element.offsetHeight > window.innerHeight) {

                                        // Set tempPosition to the difference in height
                                        tempPosition = targetObject.positionY + targetObject.element.offsetHeight - window.innerHeight

                                        // Set outer object back inbounds
                                        targetObject.positionY = window.innerHeight - targetObject.element.offsetHeight;

                                        // Adjust inner object to account for outer object
                                        secondTargetObject.positionY -= tempPosition;

                                        // Adjust the velocities to match
                                        targetObject.velocityY = 0;
                                        secondTargetObject.velocityY -= tempOffset * framesPerSecond + tempPosition * framesPerSecond;
                                        
                                    } else if (secondTargetObject.positionY - ceiling < 0) {

                                        // Set tempPosition to the difference in height
                                        tempPosition = secondTargetObject.positionY - ceiling;

                                        // Set outer object back inbounds
                                        secondTargetObject.positionY = ceiling;

                                        // Adjust inner object to account for outer object
                                        targetObject.positionY -= tempPosition;

                                        // Adjust the velocities to match
                                        secondTargetObject.velocityY = 0;
                                        targetObject.velocityY += tempOffset * framesPerSecond - tempPosition * framesPerSecond;

                                    } else {

                                        // Set velocities of objects if neither block went into a wall
                                        targetObject.velocityY += tempOffset * framesPerSecond;
                                        secondTargetObject.velocityY -= tempOffset * framesPerSecond;
                                    }


                                }
                            }
                        }
                    }
                    // Actually move elements
                    targetObject.element.style.left = targetObject.positionX + "px";
                    secondTargetObject.element.style.left = secondTargetObject.positionX + "px";
                    targetObject.element.style.top = targetObject.positionY + "px";
                    secondTargetObject.element.style.top = secondTargetObject.positionY + "px";
                    
                }
            }
        }
    drawArrows();
}
function drawObjects() {
    for (v = 1; v <= objectCount; v++) {
        currentObject = eval("object" + v);
        currentObject.element.style.left = currentObject.positionX + "px";
        currentObject.element.style.top = currentObject.positionY + "px";
    }
}
function drawArrows() {
    for (k = 1; k <= objectCount; k++) {
        currentObject = eval("object" + k);
        currentArrow = eval("arrow" + k);
        currentArrow = eval("arrow" + k);
        currentArrow.scale = Math.sqrt((currentObject.velocityX) ** 2 + currentObject.velocityY ** 2) / 2000;
        if (currentObject.velocityX !== 0) {
            currentArrow.rotation = Math.atan(currentObject.velocityY / currentObject.velocityX);
            } else {
                if (currentObject.velocityY < 0) {
                    currentArrow.rotation = Math.PI / -2;
                } else {
                    currentArrow.rotation = Math.PI / 2;
                }
            }
        if (currentObject.velocityX < 0) {
            currentArrow.rotation += Math.PI;
        }
        currentArrow.element.style.transform = "rotate(" + currentArrow.rotation + "rad) scale(" + currentArrow.scale + ")";
        currentArrow.left = currentObject.positionX + currentObject.element.offsetWidth / 2;
        currentArrow.top = currentObject.positionY + currentObject.element.offsetHeight / 2 - currentArrow.element.offsetHeight / 2;
        currentArrow.element.style.left = currentArrow.left + "px";
        currentArrow.element.style.top = currentArrow.top + "px";
    }
}

// Event Listeners
window.addEventListener("load", function () {
    ceiling = document.getElementById("menu-bar").offsetHeight;
    for (k = 1; k <= objectCount; k++) {
        currentObject = eval("object" + k);
        currentObject.element.style.left = currentObject.positionX + "px";
        currentObject.element.style.top = currentObject.positionY + "px";
    }
    drawArrows();
});