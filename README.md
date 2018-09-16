# Patcher

A utility to monkey patch any constructor, even native ones like ```Date``` and ```String```.

## Usage

Include the library:

```html
    <script src="patcher.js"></script>
```

Call the patcher:

```js
    patcher(window, 'Date', function(Original, PatchedOriginal, args) {
        // If one passed argument is a Date - this is to workaorund a bug in IE11
        if (args.length == 1 && (args[0] instanceof Original || args[0] instanceof PatchedOriginal)) {
            return new Original(args[0].getTime());
        }
        return null;
    });
```

## JSDoc

<section>
<header></header>
<article>

#### <span class="type-signature"></span>patcher<span class="signature">(context, constructorName, callback)</span><span class="type-signature"></span>

<div class="description">A utility to monkey patch any constructor, even native ones like Date or String.</div>

##### Parameters:
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name">context</td>
<td class="type"><span class="param-type">Object</span></td>
<td class="description last">window or global</td>
</tr>
<tr>
<td class="name">constructorName</td>
<td class="type"><span class="param-type">string</span></td>
<td class="description last">name of the constructor to override e.g. 'Date'</td>
</tr>
<tr>
<td class="name">beforeCallback</td>
<td class="type"><span class="param-type">beforeCallback</span></td>
<td class="description last">a callback to do special handling. return null to have original constructor called.</td>
</tr>
</tbody>
</table>

### Type Definitions

#### <span class="type-signature"></span>beforeCallback<span class="signature">(original, patchedOriginal, arguments)</span><span class="type-signature"></span>

##### Parameters:
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name">original</td>
<td class="type"><span class="param-type">function</span></td>
<td class="description last">the original constructor</td>
</tr>
<tr>
<td class="name">patchedOriginal</td>
<td class="type"><span class="param-type">function</span></td>
<td class="description last">the original constructor</td>
</tr>
<tr>
<td class="name">arguments</td>
<td class="type"><span class="param-type">Array.&lt;any&gt;</span></td>
<td class="description last">the call arguments array</td>
</tr>
</tbody>
</table>

#### <span class="type-signature"></span>afterCallback<span class="signature">(original, patchedOriginal, arguments)</span><span class="type-signature"></span>

##### Parameters:
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name">original</td>
<td class="type"><span class="param-type">function</span></td>
<td class="description last">the original constructor</td>
</tr>
<tr>
<td class="name">patchedOriginal</td>
<td class="type"><span class="param-type">function</span></td>
<td class="description last">the original constructor</td>
</tr>
<tr>
<td class="name">returnValue</td>
<td class="type"><span class="param-type">any</span></td>
<td class="description last">the return value - newly constructed object</td>
</tr>
</tbody>
</table>

#### <span class="type-signature"></span>afterThrowCallback<span class="signature">(original, patchedOriginal, arguments)</span><span class="type-signature"></span>

##### Parameters:
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name">original</td>
<td class="type"><span class="param-type">function</span></td>
<td class="description last">the original constructor</td>
</tr>
<tr>
<td class="name">patchedOriginal</td>
<td class="type"><span class="param-type">function</span></td>
<td class="description last">the original constructor</td>
</tr>
<tr>
<td class="name">exception</td>
<td class="type"><span class="param-type">any</span></td>
<td class="description last">the thrown exception</td>
</tr>
</tbody>
</table>


</article>
</section>

## Sample

[Live sample](https://rawgit.com/sandipchitale/patcher/master/index.html)

## How it works

For now [see](patcher.js).
