# what-is-this

What value is `this` in Strict, Script, or Module?

## Comparison Table

Open following URL:

- Function: <https://azu.github.io/what-is-this/>
- Method: <https://azu.github.io/what-is-this/method.html>

## :memo: Specification

- Set `[[ThisValue]]`
    - https://tc39.github.io/ecma262/#sec-evaluatecall
    - https://tc39.github.io/ecma262/#sec-call
    - https://tc39.github.io/ecma262/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    - https://tc39.github.io/ecma262/#sec-ordinarycallbindthis
- Lookup `[[ThisValue]]`
    - https://tc39.github.io/ecma262/#sec-getthisenvironment 

### Script(Global) Environment

- `[[ThisValue]]`: global

### Module Environment

- `[[ThisValue]]`: undefiled

### Function call

- Depended on call context

### Arrow Function call

- Arrow Function don't bind `[[ThisValue]]`
- Depended on enclosing environment
- https://tc39.github.io/ecma262/#sec-ordinarycallbindthis
- https://tc39.github.io/ecma262/#sec-arrow-function-definitions-runtime-semantics-evaluation
- https://esdiscuss.org/topic/clarification-regarding-top-level-arrow-functions-and-this-arguments

## Changelog

See [Releases page](https://github.com/azu/what-is-this/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/what-is-this/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
