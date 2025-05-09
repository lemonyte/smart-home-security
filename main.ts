input.onButtonPressed(Button.A, function () {
    armed = 1
    while (armed) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
        basic.pause(500)
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
        basic.pause(500)
    }
    basic.clearScreen()
})
function alarm () {
    music.play(music.stringPlayable("E C E C E C E C ", 120), music.PlaybackMode.InBackground)
    for (let index = 0; index < 4; index++) {
        pins.analogWritePin(AnalogPin.P16, 1023)
        basic.pause(500)
        pins.analogWritePin(AnalogPin.P16, 0)
        basic.pause(500)
    }
}
input.onButtonPressed(Button.B, function () {
    armed = 0
    basic.clearScreen()
})
function security () {
    if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        I2C_LCD1602.ShowString("Motion", 0, 1)
        if (input.lightLevel() < 100) {
            pins.digitalWritePin(DigitalPin.P16, 1)
            if (armed) {
                alarm()
            }
        } else {
            pins.digitalWritePin(DigitalPin.P16, 0)
        }
    } else {
        I2C_LCD1602.ShowString("      ", 0, 1)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
}
let armed = 0
basic.clearScreen()
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.BacklightOn()
armed = 0
basic.forever(function () {
    I2C_LCD1602.ShowString("Light lvl", 0, 0)
    I2C_LCD1602.ShowNumber(input.lightLevel(), 11, 0)
    security()
    basic.pause(500)
})
