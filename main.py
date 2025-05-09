def on_button_pressed_a():
    global armed
    armed = 1
    while armed:
        basic.show_leds("""
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            """)
        basic.pause(500)
        basic.show_leds("""
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            """)
        basic.pause(500)
input.on_button_pressed(Button.A, on_button_pressed_a)

def alarm():
    music.play(music.string_playable("E C E C E C E C ", 120),
        music.PlaybackMode.IN_BACKGROUND)
    for index in range(4):
        pins.analog_write_pin(AnalogPin.P16, 1023)
        basic.pause(500)
        pins.analog_write_pin(AnalogPin.P16, 0)
        basic.pause(500)

def on_button_pressed_b():
    global armed
    armed = 0
    basic.show_leds("""
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        """)
input.on_button_pressed(Button.B, on_button_pressed_b)

def security():
    if pins.digital_read_pin(DigitalPin.P15) == 1:
        if input.light_level() < 100:
            pins.digital_write_pin(DigitalPin.P16, 1)
        else:
            pins.digital_write_pin(DigitalPin.P16, 0)
        if armed:
            alarm()
    else:
        pins.digital_write_pin(DigitalPin.P16, 0)
armed = 0
basic.clear_screen()
I2C_LCD1602.lcd_init(39)
I2C_LCD1602.backlight_on()
armed = 0

def on_forever():
    I2C_LCD1602.show_string("Light lvl", 0, 0)
    I2C_LCD1602.show_number(input.light_level(), 11, 0)
    security()
    basic.pause(500)
basic.forever(on_forever)
