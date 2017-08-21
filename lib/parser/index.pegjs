File
    = _ file:identifier _ content:object
    { return content; }

keyValuePair
    = _ key:identifier _ value:(identifier / object) _
    { return { [key]: value }; }

object
    = begin_object keyValuePairs:keyValuePair* end_object
    { return Object.assign({}, ...( keyValuePairs || [] )); }

identifier
    = quote value:unescaped* quote
    { return value.join(''); }

quote           = '"'
begin_object    = _ "{" _
end_object      = _ "}" _
unescaped       = [^\0-\x1F\x22\x5C]

_               = (ws / comment)*
ws              = [ \t\n\r]+
comment         = "//" [^\r\n]*

