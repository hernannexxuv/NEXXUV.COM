# 🚀 Guía de Trabajo Git - NEXXUV

Este documento contiene el flujo de trabajo estándar para mantener el orden entre el entorno local (tu computador) y producción (nexxuv.com).

## ⚠️ Reglas de Oro

1. **La rama `main` es sagrada:** Es una copia exacta de lo que está en producción (`nexxuv.com`). **NUNCA** trabajes ni hagas cambios directamente en esta rama.
2. **Tu taller es `develop`:** Todo el trabajo diario, pruebas, nuevas funciones y correcciones se hacen aquí.
3. **El Espejo (`git status`):** Úsalo siempre antes de empezar y antes de terminar para saber si tienes cambios sin guardar.

---

## 💻 Flujo de Trabajo Diario (Paso a Paso)

Cada vez que te sientes a programar, sigue este orden:

### 1. Preparar el entorno
Asegúrate de estar en tu rama de desarrollo y descargar cualquier cambio que esté en la nube.
```bash
git checkout develop
git pull origin develop
```

### 2. Trabajar
Escribe tu código, modifica la web y prueba que todo funcione en tu entorno local (`npm run dev`).

### 3. Guardar (Commit)
Guarda tus avances de forma descriptiva.
```bash
git add .
git commit -m "feat: descripción de lo que hiciste (ej: nuevo menú)"
```

### 4. Respaldar en la Nube (Push)
Sube tus cambios a GitHub.
```bash
git push origin develop
```

---

## 🚀 Cómo pasar a Producción (Publicar en la Web)

Cuando tu trabajo en `develop` esté listo, probado y quieras que sea visible en `nexxuv.com`, sigue estos pasos para enviarlo a `main`:

```bash
# 1. Ve a la rama de producción
git checkout main

# 2. Atrapa (fusiona) los cambios que hiciste en develop
git merge develop

# 3. Sube la actualización a internet
git push origin main

# 4. (Opcional) Regresa a develop para seguir trabajando después
git checkout develop
```

---

## 🆘 Comandos de Emergencia

* **¿No sé en qué rama estoy o si tengo cosas sin guardar?**
  ```bash
  git status
  ```
* **Me equivoqué y quiero borrar los cambios que aún no guardo:**
  ```bash
  git restore .
  ```
* **Quiero ver el historial de cambios:**
  ```bash
  git log --oneline -5
  ```
