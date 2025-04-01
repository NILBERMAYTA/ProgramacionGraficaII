from vpython import *
import asyncio

scene = canvas(title="Combinación de Conceptos en VPython", width=800, height=600)

def crear_conos(posicion, radio, altura, n):
    if n == 0:
        return
    cono = cone(pos=posicion, radius=radio, length=altura, axis=vector(0, 1, 0), color=color.orange)
    if n == 3:
        global esfera_mov
        esfera_mov = cone(pos=posicion, radius=radio, length=altura, axis=vector(0, 1, 0), color=color.green)
    nueva_pos = posicion + vector(1.5 * radio, 0, 0)
    crear_conos(nueva_pos, radio * 0.8, altura * 0.8, n - 1)

def crear_cilindros(posicion, radio, altura, n):
    if n == 0:
        return
    cilindro = cylinder(pos=posicion, radius=radio, length=altura, axis=vector(0, 1, 0), color=color.purple)
    if n == 4:
        global cubo_mov
        cubo_mov = cylinder(pos=posicion, radius=radio, length=altura, axis=vector(0, 1, 0), color=color.red)
    nueva_pos = posicion + vector(0, altura * 1.5, 0)
    crear_cilindros(nueva_pos, radio * 0.8, altura * 0.8, n - 1)

crear_cilindros(vector(5, 0, 0), 1, 4, 4)
crear_conos(vector(-5, 0, 0), 2, 4, 3)

def cambiar_color(objeto):
    colores = [color.red, color.green, color.blue, color.yellow, color.orange, color.purple]
    objeto.color = colores[int(random() * len(colores))]

def cambiar_colores():
    cambiar_color(cubo_mov)
    cambiar_color(esfera_mov)

def reiniciar_posicion():
    cubo_mov.pos = vector(0, 0, 0)
    esfera_mov.pos = vector(0, 0, 0)

def tecla_presionada(evt):
    if evt.key == 'c':
        cambiar_colores()
    elif evt.key == 'r':
        reiniciar_posicion()

scene.bind('keydown', tecla_presionada)

async def mover_cilindro(objeto, eje):
    while True:
        objeto.pos += eje * 0.1
        if objeto.pos.x > 2 or objeto.pos.y > 2 or objeto.pos.z > 2:
            objeto.pos = vector(5, 0, 0)
        await asyncio.sleep(0.1)

async def mover_cono(objeto, eje):
    while True:
        objeto.pos += eje * 0.1
        if objeto.pos.x > 2 or objeto.pos.y > 2 or objeto.pos.z > 2:
            objeto.pos = vector(-5, 0, 0)
        await asyncio.sleep(0.1)

async def main():
    task1 = asyncio.create_task(mover_cilindro(cubo_mov, vector(1, 0, 1)))
    task2 = asyncio.create_task(mover_cono(esfera_mov, vector(1, 0, 1)))
    await asyncio.gather(task1, task2)

asyncio.run(main())
