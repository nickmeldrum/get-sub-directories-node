# list-subdirectories-node

A simple function that allows you to pass in a path to a directory and it will return a string array of subdirectories.

## Installation

`yarn install list-subdirectories`

or

`npm install list-subdirectories`

## Basic usage example

The following code will log out a string array of subdirectories for the current directory:

```
const listSubdirectories = require('list-subdirectories')

listSubdirectories('.').then(list => console.log(list))
```

## API

### listSubdirectories method

This is the only method available in the library. It is the default export (there are no named exports.)

It accepts 2 parameters:

#### path: string (required)

A string value of an absolute path to search for subdirectories within.

#### options: object (optional)

If not provided, the key values will default to:

```
    {
        filter: undefined,
        levels: 1,
        recursive: false,
    }
```

I.e. it will search for all subdirectories (unfiltered) at the 1st level only (no subdirectories of subdirectories.)

Details on the possible key values:

##### filter: string (optional)

 * An optional regular expression string that will be used to match against the subdirectory name. (Note 'name' NOT full path.)
 * If not included, then the method will return ALL subdirectories.
 * If included, then the method will return only matched subdirectories.

##### levels: number (optional)

 * An optional number to specify how many levels deep the method should search.
 * Can be any integer greater than zero.
 * If not included, then the method will assume a level of 1 (unless `recursive` is specified.)
 * Only specify EITHER `levels` or `recursive` NOT both.
 * If you don't want a cap on levels (i.e. "as deep as you can go"), use the `recursive` key instead.

##### recursive: boolean (optional)

 * An optional boolean that, if set to true, specifies to search recursively through all subdirectories.
 * If not included or set to false, the method will assume a level of 1 or use the `levels` key if specified.
 * Only specify EITHER `levels` or `recursive` NOT both.

## Errors

### Not Found

If the path passed in is not found, the `System Error`: `ENOENT: no such file or directory` error is thrown:

```
    { Error: ENOENT: no such file or directory, scandir '/[FULLPATH]/[DIRECTORYTHATDOESNOTEXIST]'
      errno: -2,
      code: 'ENOENT',
      syscall: 'scandir',
      path: '/[FULLPATH]/[DIRECTORYTHATDOESNOTEXIST]' }
```

### Invalid Arguments

If arguments supplied are of the wrong type, then a `TypeError` is thrown:

```
    { Error: TypeError: ...
      stack: ...
    }
```

If both `levels` and `recursive` are specified in the options, then a `RangeError` is thrown:

```
    { Error: RangeError: please specify one of: levels | recursive. We cannot correctly interpret your wishes when both are specified,
      stack: ...
    }
```

If you specify zero, a negative number or a floating point number as a level, then a `RangeError` is thrown:

```
    { Error: RangeError: levels must be a non-negative non-zero integer,
      stack: ...
    }
```

## Examples

### Using the defaults:

This will return a list of subdirectories (non-recursive) of the current directory:

```
listSubdirectories('.').then(list => console.log(list))
```

### Using a filter:

This will return a list of subdirectories (non-recursive) of the current directory that start with the string `foo`:

```
listSubdirectories('.', { filter: '^foo.*' }).then(list => console.log(list))
```

### Searching recursively:

This will return a list of all subdirectories recursively (no depth limit):

```
listSubdirectories('.', { recursive: true }).then(list => console.log(list))
```

### Using levels:

This will return a list of all subdirectories recursively to a limit of 2 (i.e. subdirectories and THEIR subdirectories, but no deeper):

```
listSubdirectories('.', { levels: 2 }).then(list => console.log(list))
```

### Invalid options:

All of the following will throw a `RangeError`:

```
listSubdirectories('.', { levels: 2, recursive: true }).then(list => console.log(list))
listSubdirectories('.', { levels: -1.5 }).then(list => console.log(list))
```

All of the following will throw a `TypeError`:

```
listSubdirectories(0).then(list => console.log(list))
listSubdirectories('.', '').then(list => console.log(list))
listSubdirectories('.', { filter: true }).then(list => console.log(list))
listSubdirectories('.', { levels: 'something' }).then(list => console.log(list))
listSubdirectories('.', { recursive: 'do it please' }).then(list => console.log(list))
```

This will throw a `More arguments needed Error`:

```
listSubdirectories().then(list => console.log(list))
```

## License

[ISC](https://opensource.org/licenses/ISC)
(i.e. feel free to use this for any purpose, but I accept no liability for it's use.)

## Contributing

Feel free to [open issues](https://github.com/nickmeldrum/list-subdirectories-node/issues) or even better [submit pull requests](https://github.com/nickmeldrum/list-subdirectories-node/pulls).

### Guidelines for contributing (good pull requests):

 * Please follow the style that is already present in the repository.
 * Please ensure the code passes all lint (eslint) and format (prettier) rules (Check using `yarn lint`.)
 * Please ensure all (jest) tests are passing (Check using `yarn test`.)
 * Please ensure all code is covered by tests. (Check the coverage report created by `yarn test`.)
 * Please ensure any change in the public api is documented properly in the *README*.

If you would like to become a maintainer, feel free to [contact me](https://github.com/nickmeldrum). You would probably have to have become known to me via submitted pull requests first.

## Keywords

 * filesystem
