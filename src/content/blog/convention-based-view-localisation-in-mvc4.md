---
title: "Convention based view localisation in mvc4"
pubDate: "2013-01-01T22:12:03.284Z"
description: ""
cover: "/images/blog/earth.webp"
category: ".net"
---

I really like the mobile stuff in mvc4 (apart from faffing around with the 51 degrees stuff to actually get it to see any phones as phones). Creating mobile views just by creating a new view in the form of [viewname].mobile is great!

I got to wondering if we could do something similar for localized views. Now this isn’t a replacement for normal localisation via resx as if you did this just for textual changes the number of duplicated views you would have would be stupid. That said, sometimes you want a view in a different locale to be completely different and this is where this comes in.

Long story short:

- Source available at https://github.com/stevejhiggs/Mvc4ViewLocalisation
- Works for both views and partial views
- The mobile stuff still works as well (woo!)
- View lookups are not cached and I’m not sure of the overhead of the view misses at the moment.
