#### Hexlet tests and linter status:

[![Actions Status](https://github.com/Tatiana-Popova/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Tatiana-Popova/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/f4db6a704392c135f5d0/maintainability)](https://codeclimate.com/github/Tatiana-Popova/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f4db6a704392c135f5d0/test_coverage)](https://codeclimate.com/github/Tatiana-Popova/frontend-project-lvl2/test_coverage)
[![test](https://github.com/Tatiana-Popova/frontend-project-lvl2/actions/workflows/test.yml/badge.svg)](https://github.com/Tatiana-Popova/frontend-project-lvl2/actions/workflows/test.yml)

---

**Вычислитель отличий** – программа, определяющая разницу между двумя структурами данных.

Возможности утилиты:

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

---

# Usage

**install**

```sh
$ git clone https://github.com/Tatiana-Popova/frontend-project-lvl2
$ make install
$ sudo npm link
```

**start using**

```sh
Usage: gendiff [options] <filepath1> <filepath2>
Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

**start tests**

```sh
npx jest
```

---

### Сравнение плоских файлов (JSON)

[![asciicast](https://asciinema.org/a/UHMiiK5gJHBmja9pabWICBuzK.svg)](https://asciinema.org/a/UHMiiK5gJHBmja9pabWICBuzK)

### Сравнение плоских файлов (yaml)

[![asciicast](https://asciinema.org/a/lICXo5JPop72VFBf1hP7sfrRi.svg)](https://asciinema.org/a/lICXo5JPop72VFBf1hP7sfrRi)

### Сравнение рекурсивных файлов

[![asciicast](https://asciinema.org/a/HJL4G853WqNTPI45vMpvwaUbn.svg)](https://asciinema.org/a/HJL4G853WqNTPI45vMpvwaUbn)

### Вывод в plain формате

[![asciicast](https://asciinema.org/a/IjSLuQlV0NJGRQRUE7PHxr8PD.svg)](https://asciinema.org/a/IjSLuQlV0NJGRQRUE7PHxr8PD)

### Вывод в json формате

[![asciicast](https://asciinema.org/a/rUXPpt4UVEkTbO3EMT1mE3dz3.svg)](https://asciinema.org/a/rUXPpt4UVEkTbO3EMT1mE3dz3)
