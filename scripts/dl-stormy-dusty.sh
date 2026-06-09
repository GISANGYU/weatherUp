#!/usr/bin/env bash
# 신규 테마(stormy/dusty) 카드 이미지 다운로드 — loremflickr (deterministic lock)
set -u
ROOT="C:/react-weatherUp/public/images"

# id|category|theme|keywords|lock
ENTRIES="
sto1|ootd|stormy|raincoat,rain,jacket|6101
sto2|ootd|stormy|raincoat,rain|6102
sto3|ootd|stormy|hoodie,dark,fashion|6103
sto4|ootd|stormy|rain,boots|6104
sto5|ootd|stormy|parka,rain,jacket|6105
sto6|ootd|stormy|trench,coat,black|6106
sto7|ootd|stormy|windbreaker,rain|6107
sto8|ootd|stormy|anorak,jacket|6108
sto9|ootd|stormy|knit,sweater,dark|6109
sto10|ootd|stormy|sneakers,rain|6110
sto11|ootd|stormy|denim,jacket,dark|6111
sto12|ootd|stormy|umbrella,rain,street|6112
stf1|food|stormy|kimchi,pancake|6201
stf2|food|stormy|noodle,soup,spicy|6202
stf3|food|stormy|ramen,tonkotsu|6203
stf4|food|stormy|stew,korean,soup|6204
stf5|food|stormy|hotpot,korean|6205
stf6|food|stormy|chicken,spicy,stew|6206
stf7|food|stormy|fishcake,soup|6207
stf8|food|stormy|tofu,stew,spicy|6208
stf9|food|stormy|whisky,bar|6209
stf10|food|stormy|seafood,pancake|6210
stf11|food|stormy|malatang,spicy,soup|6211
stf12|food|stormy|gukbap,soup,rice|6212
sta1|activity|stormy|cinema,movie,theater|6301
sta2|activity|stormy|jazz,bar,live|6302
sta3|activity|stormy|vinyl,record,bar|6303
sta4|activity|stormy|climbing,indoor|6304
sta5|activity|stormy|boardgame,cafe|6305
sta6|activity|stormy|art,museum,gallery|6306
sta7|activity|stormy|escape,room,puzzle|6307
sta8|activity|stormy|sauna,spa|6308
sta9|activity|stormy|theater,stage,play|6309
sta10|activity|stormy|karaoke,microphone|6310
sta11|activity|stormy|book,cafe,reading|6311
sta12|activity|stormy|sushi,omakase|6312
duo1|ootd|dusty|mask,fashion,street|6401
duo2|ootd|dusty|windbreaker,jacket|6402
duo3|ootd|dusty|bucket,hat,fashion|6403
duo4|ootd|dusty|longsleeve,fashion|6404
duo5|ootd|dusty|scarf,fashion|6405
duo6|ootd|dusty|sunglasses,fashion|6406
duo7|ootd|dusty|khaki,jacket|6407
duo8|ootd|dusty|anorak,hood,jacket|6408
duo9|ootd|dusty|trench,beige,coat|6409
duo10|ootd|dusty|hoodie,zipup|6410
duo11|ootd|dusty|cap,mask,street|6411
duo12|ootd|dusty|knit,earth,sweater|6412
duf1|food|dusty|pear,tea|6501
duf2|food|dusty|quince,tea|6502
duf3|food|dusty|ginger,tea|6503
duf4|food|dusty|seaweed,soup|6504
duf5|food|dusty|beansprout,soup|6505
duf6|food|dusty|beef,soup,broth|6506
duf7|food|dusty|greentea,latte|6507
duf8|food|dusty|green,juice,detox|6508
duf9|food|dusty|pear,dessert|6509
duf10|food|dusty|noodle,soup,korean|6510
duf11|food|dusty|pumpkin,porridge|6511
duf12|food|dusty|herbal,tea,jujube|6512
dua1|activity|dusty|art,museum,gallery|6601
dua2|activity|dusty|bookstore,books|6602
dua3|activity|dusty|aquarium,fish|6603
dua4|activity|dusty|greenhouse,plants|6604
dua5|activity|dusty|cinema,movie|6605
dua6|activity|dusty|baking,class,pastry|6606
dua7|activity|dusty|coffee,cafe,laptop|6607
dua8|activity|dusty|pottery,ceramics|6608
dua9|activity|dusty|virtual,reality,game|6609
dua10|activity|dusty|spa,massage|6610
dua11|activity|dusty|shopping,mall|6611
dua12|activity|dusty|design,exhibition|6612
"

ok=0; fail=0; failed=""
for row in $ENTRIES; do
  [ -z "$row" ] && continue
  id="${row%%|*}"; rest="${row#*|}"
  cat="${rest%%|*}"; rest="${rest#*|}"
  theme="${rest%%|*}"; rest="${rest#*|}"
  kw="${rest%%|*}"; lock="${rest##*|}"
  dir="$ROOT/$cat/$theme"
  mkdir -p "$dir"
  out="$dir/$id.jpg"
  url="https://loremflickr.com/600/450/${kw}?lock=${lock}"
  for attempt in 1 2 3; do
    curl -fsSL --max-time 40 -o "$out" "$url" 2>/dev/null
    sz=$(wc -c < "$out" 2>/dev/null || echo 0)
    if [ "$sz" -gt 3000 ]; then ok=$((ok+1)); break; fi
    if [ "$attempt" = "3" ]; then fail=$((fail+1)); failed="$failed $id"; fi
    sleep 1
  done
done
echo "DONE ok=$ok fail=$fail"
[ -n "$failed" ] && echo "FAILED:$failed"
