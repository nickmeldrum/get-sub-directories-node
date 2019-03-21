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

Notice that it doesn't support callbacks and is promisified by default.

## API

### listSubdirectories method

This is the only method available in the library. It is the default export (there are no named exports.)

It expects 1 required parameter. That parameter can be a string or an object.

If that parameter is a string:

#### path: string

It uses the parameter as the absolute path to scan for subdirectories within.
It assumes the defaults for the other options:

```
    {
        filter: undefined,
        recursive: false,
        maxDepth: 1,
    }
```

I.e. it will scan for all subdirectories (unfiltered) at the 1st level only (no subdirectories of subdirectories.)

If the 1st parameter is an object:

#### options: object

The options object definition looks like this:

```
    {
        path: string, // path is required and must be a string
        filter?: string, // filter is an optional string value
        recursive?: boolean, // recursive is an optional boolean value
        maxDepth?: number, // maxDepth is an optional number and can only be present if recursive is set to true
    }
```

If the optional values are not provided, they will default to:

```
    {
        filter: undefined, // no filter set, so it will return all subdirectories
        recursive: false, // don't scan recursively so it will only return immediate subdirectories
        maxDepth: undefined, // no max depth defined as we aren't scanning recursively
    }
```

More details on the possible options:

##### path: string (required)

 * the absolute path to the directory to scan for subdirectories.
 * this parameter is required and must reference an existing directory or the method will throw an error.

##### filter: string (optional)

 * An optional regular expression string that will be used to match against the subdirectory name. (Note 'name' NOT full path.)
 * If not included, then the method will return ALL subdirectories.
 * If included, then the method will return only matched subdirectories.

##### recursive: boolean (optional)

 * An optional boolean that, if set to true, specifies to scan recursively through all subdirectories.
 * If not included or set to false, the method will only scan the immediate subdirectories.

##### maxDepth: number (optional)

 * An optional number to specify the max depth the method should scan if scanning recursively.
 * Can be any integer greater than zero.
 * If recursive is true and maxDepth is not specified, the method will continue scanning to a theoretical infinite depth.
 * You can only specify maxDepth is recursive is set to true. An error will occur if recursive is not set to true and maxDepth is set.

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

If both `maxDepth` is set and `recursive` is not set to true, then a `RangeError` is thrown:

```
    { Error: RangeError: You can only set maxDepth if recursive is set to true,
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

### Scanning recursively:

This will return a list of all subdirectories recursively (no depth limit):

```
listSubdirectories('.', { recursive: true }).then(list => console.log(list))
```

### Using maxDepth:

This will return a list of all subdirectories recursively to a limit of 2 (i.e. subdirectories and THEIR subdirectories, but no deeper):

```
listSubdirectories('.', { recursive: true, maxDepth: 2 }).then(list => console.log(list))
```

### Invalid options:

All of the following will throw a `RangeError`:

```
listSubdirectories('.', { maxDepth: 2, recursive: false }).then(list => console.log(list))
listSubdirectories('.', { maxDepth: -1.5 }).then(list => console.log(list))
```

All of the following will throw a `TypeError`:

```
listSubdirectories(0).then(list => console.log(list))
listSubdirectories('.', '').then(list => console.log(list))
listSubdirectories('.', { filter: true }).then(list => console.log(list))
listSubdirectories('.', { maxDepth: 'something' }).then(list => console.log(list))
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
