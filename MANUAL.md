# Laravel Default

A default [Laravel][laravel] [Preset][preset] and scaffolding.

## Usage

Run `preset apply eviweb/laravel-default` for a default installation, or use the form `preset apply eviweb/laravel-default [OPTIONS]` where `[OPTIONS]` are [described below][manual-options].

> Please refer to [Preset CLI Quick Start][preset-quick-start] for more information regarding the usage of the `preset` command.

## Options

* `--new-laravel PROJECT_NAME`: it creates a Laravel project scaffolding in a subdirectory named as `PROJECT_NAME`.
* `--dir DIRECTORY_PATH`: it changes the Preset command target directory to `DIRECTORY_PATH`. It recursively tries to create the directory tree if `DIRECTORY_PATH` does not exist.  
If not specify the current directory is used by default.
* `--no-vite-js`: by default the [laravel-presets/vite][laravel-presets-vite] nested preset is installed by default with the `--no-tailwindcss` option. If you do not want to install it, just use this command line option.
* `--use-preset PRESET[,PRESET_OPTIONS]`: apply the given `PRESET`.  
If the preset has to be applied with options, simply pass them in a comma separated list (see example below).  
This option can be used multiple times to apply many presets.
  > eg. `preset apply eviweb/laravel-default --use-preset laravel-presets/pest --use-preset laravel-presets/vite,--no-tailwindcss`

## License

This project is licensed under the terms of the [MIT License][mit-license].

[laravel]: https://laravel.com
[laravel-presets-vite]: https://github.com/laravel-presets/vite
[manual-options]: /MANUAL.md#options
[mit-license]: /LICENSE.md
[preset]: https://preset.dev
[preset-quick-start]: https://preset.dev/quick-start.html
