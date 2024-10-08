<template>
    <article ref="Article">
        <div><b>前言</b>
            <p>橋牌是一個打牌和叫牌都很重要的遊戲。對我而言，叫牌又是特別地引人入勝。叫牌的規則很少，大概只有花色與NT的大小順序、不能叫超過7線，Double、Redouble等等的簡易規則。本文介紹的是「約定」，不是「規則」。原則上，想怎麼約定都行，而本文是提供學習者（尤其是臺大醫學院橋藝社社員）一個入門用的制度，簡單而強大，提供一個良好的基礎，並希望讀者能喜歡上橋牌這個遊戲。</p>
        </div>
        <div><h2>開叫</h2>
            <table class="bidtable">
                <tr>
                    <th colspan="2">開叫</th>
                </tr>
                <tr>
                    <td><a href="#1C">1!C</a></td>
                    <td>平均牌2張以上梅花，12-14點或18-19點；非平均牌4張以上梅花，12-21點。</td>
                </tr>
                <tr>
                    <td><a href="#1D">1!D</a></td>
                    <td>4張以上方塊。平均牌12-14點或18-19點；非平均牌12-21點。</td>
                </tr>
                <tr>
                    <td>1!H/!S</td>
                    <td>5張以上，12-21。</td>
                </tr>
                <tr>
                    <td>1NT</td>
                    <td>15-17，平均牌型，沒有5張高花。</td>
                </tr>
                <tr>
                    <td>2!C</td>
                    <td>強牌迫叫。</td>
                </tr>
                <tr>
                    <td>2NT</td>
                    <td>20-21平均牌型，可能有5張高花。</td>
                </tr>
            </table>
            <ul>
                <li>12點以上必定要開叫。開叫不是單指叫牌，而是指如果有順序在前的玩家，都Pass以後，輪到自己的這個情況下。</li>
                <li>22點以上的牌，都以2!C開叫。12-21點的牌，請參閱以下說明。</li>
                <li>以開叫最長的花色為原則，不過我們規定!S/!H要5張以上、!D要4張以上才可以開叫。</li>
                <li>如果拿5張!C/!D，或沒有5張花色的手牌，此時可能是「平均牌型」。「平均牌型」指5332、4432、4333這三種牌型，應依照對應的點力範圍選擇叫品。
                    <ul>
                        <li>12-14。開叫1!C/1!D</li>
                        <li>15-17。開叫1NT</li>
                        <li>18-19。開叫1!C/1!D</li>
                        <li>20-21。開叫2NT</li>
                    </ul>
                    事實上，點力範圍的設計就是交叉使用，並且前兩個的範圍是三個點，而後兩個的範圍是2個點。
                </li>
                <li>未滿12點時，開叫是以「擾亂對手」為本質。見下方。</li>
            </ul>
            <table class="bidtable">
                <tr>
                    <th colspan="2">竄叫（又稱阻塞叫，即擾亂性叫牌）</th>
                </tr>
                <tr>
                    <td>2!D/!H/!S</td>
                    <td>6張以上的!D/!H/!S。通常約6-9點。</td>
                </tr>
                <tr>
                    <td>3!C/!D/!H/!S</td>
                    <td>7張以上的!C/!D/!H/!S。通常約6-9點。</td>
                </tr>
                <tr>
                    <td>4!C/!D/!H/!S</td>
                    <td>8張以上的!C/!D/!H/!S。通常約6-9點。</td>
                </tr>
            </table>
            <ul>
                <li>竄叫時，點力通常較集中在竄叫的花色中。</li>
                <li>可參考「二、三定律」
                    <ul>
                        <li>在我方有身價時（叫牌盒方位的底色是紅色），而對方無身價（叫牌盒方位的底色是綠色）時，以倒兩墩為目標竄叫。</li>
                        <li>其他情形以倒三墩為目標竄叫。</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div><h2>低花開叫的後續</h2>
            <table class="bidtable" id="1C">
                <tr>
                    <th>1!C</th>
                    <th>2張以上梅花，12-21點。</th>
                </tr>
                <tr>
                    <td>1!D</td>
                    <td>6點以上，通常4張以上方塊。如果有4張高花而點力不滿12點時，先叫4張高花。</td>
                </tr>
                <tr>
                    <td><a href="#1C-1H">1!H</a></td>
                    <td>6點以上，4張以上紅心。</td>
                </tr>
                <tr>
                    <td>1!S</td>
                    <td>6點以上，4張以上黑桃。</td>
                </tr>
                <tr>
                    <td>1NT</td>
                    <td>6-9(10)點，沒有一門4張以上的!H或!S。</td>
                </tr>
                <tr>
                    <td>2!C</td>
                    <td>11點以上。5張以上梅花支持，沒有4張以上高花。邀請，迫叫到3!C。</td>
                </tr>
                <tr>
                    <td>2NT</td>
                    <td>10-11(12)點，沒有一門4張以上的!H或!S。</td>
                </tr>
            </table>
            <p>1!D開叫的答叫叫品，主要是多了一個2!C迫叫成局的叫品。</p>
            <table class="bidtable" id="1D">
                <tr>
                    <th>1!D</th>
                    <th>4張以上方塊，12-21點。</th>
                </tr>
                <tr>
                    <td>1!H</td>
                    <td>6點以上，4張以上紅心。</td>
                </tr>
                <tr>
                    <td>1!S</td>
                    <td>6點以上，4張以上黑桃。</td>
                </tr>
                <tr>
                    <td>1NT</td>
                    <td>6-9(10)點，沒有一門4張以上的!H或!S。</td>
                </tr>
                <tr>
                    <td>2!C</td>
                    <td>12點以上，迫叫成局。5張以上梅花牌組。</td>
                </tr>
                <tr>
                    <td>2!D</td>
                    <td>11點以上。4張以上方塊支持，沒有4張以上高花。邀請，迫叫到3!D。</td>
                </tr>
                <tr>
                    <td>2NT</td>
                    <td>10-11(12)點，沒有一門4張以上的!H或!S。</td>
                </tr>
            </table>
            <ul>
                <li>低花開叫後答叫一樣以叫出最長花色為原則。但有幾個例外：
                    <ul>
                        <li>沒有迫叫成局的點力時：
                            <ul>
                                <li>有4張高花（!H/!S）的時候，應忽略掉更長的!D。</li>
                                <li>不能「二蓋一」（這裡只有1!D後叫2!C一個情形）。</li>
                            </ul>
                        </li>
                        <li>當最長的花色與開叫的花色相同時，如果有4張高花，也應先叫4張高花。否則進行「低花反序」（弱的叫得多，強的叫得少），並要注意張數的最低限制：
                            <ul>
                                <li>叫二線要有邀請以上（好的10點以上）的力量，叫三線要有7-9點（或壞的10點）的力量。</li>
                                <li>1!C後面叫二線要有五張!C；三線要有六張!C。</li>
                                <li>1!D後面叫二線要有四張!D；三線要有五張!D。</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>選擇叫高花時，若有兩門以上4張高花時，叫張數較多的花色。張數一樣多時，皆為4張時叫1!H；皆為5張或以上時，叫1!S。</li>
                <li>無叫品可叫時（不能叫4張高花，不能叫低花反序，不能叫出沒叫過的低花時），依照點力叫NT的叫品</li>
            </ul>
            <div><h3>答叫高花以後：1m-1M</h3>
                <table class="bidtable" id="1C-1H">
                    <tr>
                        <th><a href="#1C">1!C</a></th>
                        <th>1!H</th>
                        <th>6點以上，4張以上紅心。</th>
                    </tr>
                    <tr>
                        <td colspan="2">1!S</td>
                        <td>沒有4張以上紅心（＝沒配合），有4張以上黑桃，12-19點。</td>
                    </tr>
                    <tr>
                        <td colspan="2">1NT</td>
                        <td>沒有4張以上紅心，12-14點，通常是平均牌型。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2!C</td>
                        <td>沒有4張以上紅心，5張以上梅花（通常6張以上），12-15點。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2!H</td>
                        <td>4張以上紅心支持，12-15點。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2NT</td>
                        <td>沒有4張以上紅心，18-19點，平均牌型。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3!C</td>
                        <td>沒有4張以上紅心，6張以上梅花，16-18點。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3!H</td>
                        <td>4張以上紅心支持，16-17(18)點。</td>
                    </tr>
                    <tr>
                        <td colspan="2">4!H</td>
                        <td>4張以上紅心支持，18點以上。</td>
                    </tr>
                </table>
                <table class="bidtable">
                    <tr>
                        <th colspan="2">1!C-1!H 後續非平均的強力叫品</th>
                    </tr>
                    <tr>
                        <td>2!D</td>
                        <td>「倒叫」16點以上，通常4張以上方塊，沒有4張紅心。迫叫一圈且保證再叫。</td>
                    </tr>
                    <tr>
                        <td>2!S</td>
                        <td>「強跳叫」19點以上，4張以上黑桃，沒有4張紅心。迫叫成局。</td>
                    </tr>
                    <tr>
                        <td>3!D</td>
                        <td>「Splinter」19點以上，4張以上紅心支持，方塊短門（一張以下），迫叫成局。</td>
                    </tr>
                    <tr>
                        <td>3!S</td>
                        <td>「Splinter」19點以上，4張以上紅心支持，方塊短門（一張以下），迫叫成局。</td>
                    </tr>
                </table>
                <p>1m-1M的後續都很相似。</p>
                <ul>
                    <li>有4張的高花支持
                        <ul>
                            <li>依照點力的範圍決定要如何支持（2!H/3!H/4!H）</li>
                            <li>極強（19+）的非平均牌情況叫「Splinter」特約叫品</li>
                        </ul>
                    </li>
                    <li>無4張的高花支持
                        <ul>
                            <li>平均牌型：叫1NT（12-14點）、2NT（18-19點）</li>
                            <li>非平均牌型：有另一門4張以上的牌組
                                <ul>
                                    <li>在1線叫出新花色：12-19點，4張以上。</li>
                                    <li>在2線叫出新花色，新花色低於第一次叫的花色（例如1!D-1M-2!C）：12-17點，4張以上。</li>
                                    <li>在2線叫出新花色，新花色高於第一次叫的花色，而且沒辦法在1線叫出該花色（例如1!C-1M-2!D）：16點以上，迫叫一圈。</li>
                                    <li>在2線叫出新花色，新花色高於第一次叫的花色，而且可以在1線叫出該花色（例如1!C-1!H-2!S）：19點以上，迫叫成局。</li>
                                </ul>
                            </li>
                            <li>非平均牌型：沒有另一門4張以上的牌組
                                <ul>
                                    <li>2線重新叫一次開叫的牌組：12-15點</li>
                                    <li>3線重新叫一次開叫的牌組：16-18點</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div><h3>再叫1NT以後：1m-1M-1NT</h3>
                <table class="bidtable">
                    <tr>
                        <th></th>
                        <th colspan="2">1m</th>
                    </tr>
                    <tr>
                        <th>1M</th>
                        <th>1NT</th>
                        <th>沒有4張M支持，12-14平均牌型。</th>
                    </tr>
                    <tr>
                        <td colspan="2">2m</td>
                        <td>建議打2m合約，低限的點力。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2om</td>
                        <td>「新低花迫叫」邀請以上，迫叫一圈。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2M</td>
                        <td>5張以上的高花，6-9點。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2oM</td>
                        <td><ul>
                            <li>如果是!S：4張以上!S，12點以上，迫叫成局。</li>
                            <li>如果是!H：5張!S，4張以上!H，6-9點不迫叫。</li>
                        </ul></td>
                    </tr>
                    <tr>
                        <td colspan="2">2NT</td>
                        <td>偏向平均牌型，10-11點，邀請。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3m</td>
                        <td>足夠張數的低花支持，10-11點，邀請。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3M</td>
                        <td>6張以上高花支持，10-11點，邀請。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3NT</td>
                        <td>12-17(18)點。</td>
                    </tr>
                </table>
            </div>
            <div><h3>被干擾以後的處理方法</h3>
                <table class="competitive">
                    <tr>
                        <th>1m</th>
                        <th>(X)</th>
                        <th>Takeout double</th>
                    </tr>
                    <tr>
                        <td colspan="2">XX</td>
                        <td>10點以上的力量。通常是平均牌或支持同伴的花色，或想要懲罰對手。</td>
                    </tr>
                    <tr>
                        <td colspan="2">1!D/!H/!S</td>
                        <td>8點以上，4張以上的牌組，8點以上，迫叫一圈。</td>
                    </tr>
                    <tr>
                        <td colspan="2">1NT</td>
                        <td>8-10點，沒有特別可以叫的東西。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2!C</td>
                        <td>1!D以後叫2!C，5張以上牌組，6-9點。</td>
                    </tr>
                </table>
                <ul>
                    <li>原則上一線新花迫叫，二線新花不迫叫</li>
                </ul>
                <table class="competitive">
                    <tr>
                        <th>1m</th>
                        <th>(1!H)</th>
                        <th>通常5張以上的紅心牌組，8點以上</th>
                    </tr>
                    <tr>
                        <td colspan="2">X</td>
                        <td>(Negative double) 4張!S，6點以上。</td>
                    </tr>
                    <tr>
                        <td colspan="2">1!S</td>
                        <td>5張!S，6點以上，迫叫一圈。</td>
                    </tr>
                    <tr>
                        <td colspan="2">1NT</td>
                        <td>8-9(10)點。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2om</td>
                        <td>5張m，10點以上，迫叫一圈。</td>
                    </tr>
                    <tr>
                        <th>1m</th>
                        <th>(1!S)</th>
                        <th>通常5張以上黑桃的牌組，8點以上</th>
                    </tr>
                    <tr>
                        <td colspan="2">X</td>
                        <td>(Negative double) 4張以上!H，8點以上。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2!H</td>
                        <td>5張!H，10點以上，迫叫一圈。</td>
                    </tr>
                </table>
                <ul>
                    <li>Negative double通常表示另一門高花4張。但也可能是因為點力不足以叫出高花才使用（Negative double點力要求較低）。</li>
                    <li>原則上新花迫叫，二線新花迫叫（邀請以上力量），三線新花迫叫成局。</li>
                </ul>
            </div>
        </div>
        <div><h2>1NT開叫的後續</h2>
            <p>這邊的1NT後續只是一個簡單的指引。</p>
            <table class="bidtable" id="1NT">
            <tr>
                <th>1NT</th>
                <th>15-17。平均牌型。</th>
            </tr>
            <tr>
                <td><a href="#1NT-2C">2!C!</a></td>
                <td>Stayman，有可能是5張黑桃的邀請牌。</td>
            </tr>
            <tr>
                <td><a href="#1NT-2D">2!D!</a></td>
                <td>轉換紅心</td>
            </tr>
            <tr>
                <td><a href="#1NT-2H">2!H!</a></td>
                <td>轉換黑桃</td>
            </tr>
            <tr>
                <td>2NT</td>
                <td>8-9點，邀請。</td>
            </tr>
            <tr>
                <td>3NT</td>
                <td>10-15點，束叫。</td>
            </tr>
            <tr>
                <td>4!D</td>
                <td>9點以上，6張以上紅心，轉換紅心。</td>
            </tr>
            <tr>
                <td>4!H</td>
                <td>9點以上，6張以上黑桃，轉換黑桃。</td>
            </tr>
            </table>
        
            <div><h4>2!C Stayman</h4>
                <p>2!C的回答非常平常，而在這之後2!S都是5張黑桃的邀請。</p>
                <table class="bidtable" id="1NT-2C">
                    <tr>
                        <th>1NT</th>
                        <th>2!C</th>
                        <th>Stayman</th>
                    </tr>
                    <tr>
                        <td colspan="2"><a href="#1NT-2C-2D">2!D</a></td>
                        <td>沒有4張高花</td>
                    </tr>
                    <tr>
                        <td colspan="2"><a href="#1NT-2C-2H">2!H</a></td>
                        <td>4張以上紅心，可能有4張黑桃</td>
                    </tr>
                    <tr>
                        <td colspan="2"><a href="#1NT-2C-2S">2!S</a></td>
                        <td>4張以上黑桃，沒有4張紅心</td>
                    </tr>
                </table>
                <p>2!D回答以後，2!H是4-5邀請，另外還有Smolen和Texas特約。</p>
                <table class="bidtable" id="1NT-2C-2D">
                    <tr>
                        <th></th>
                        <th>1NT</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th><a href="#1NT-2C">2!C</a></th>
                        <th>2!D</th>
                        <th>沒有4張高花</th>
                    </tr>
                    <tr>
                        <td colspan="2">2!H</td>
                        <td>5張紅心4張黑桃的邀請牌。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2!S</td>
                        <td>5張黑桃，有或沒有4張紅心的邀請牌。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2NT</td>
                        <td>邀請。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3!H!</td>
                        <td>4張紅心，5張黑桃，迫叫成局。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3!S!</td>
                        <td>4張黑桃，5張紅心，迫叫成局。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3NT</td>
                        <td>束叫。</td>
                    </tr>
                </table>
                <p>聽到有4張高花的回答以後，除了2!S是5張黑桃的邀請以外，其他叫品是自然。</p>
                <table class="bidtable" id="1NT-2C-2H">
                    <tr>
                        <th></th>
                        <th>1NT</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th><a href="#1NT-2C">2!C</a></th>
                        <th>2!H</th>
                        <th>4張以上紅心，可能有4張黑桃。</th>
                    </tr>
                    <tr>
                        <td colspan="2">2!S</td>
                        <td>5張黑桃的邀請牌，沒有4張紅心。</td>
                    </tr>
                    <tr>
                        <td colspan="2">2NT</td>
                        <td>邀請。有4張黑桃。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3!H</td>
                        <td>4張紅心，邀請。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3NT</td>
                        <td>束叫。</td>
                    </tr>
                    <tr>
                        <td colspan="2">4!H</td>
                        <td>束叫。</td>
                    </tr>
                    <tr id="1NT-2C-2S">
                        <th></th>
                        <th><a href="#1NT">1NT</a></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th><a href="#1NT-2C">2!C</a></th>
                        <th>2!S</th>
                        <th>4張以上黑桃，沒有4張紅心。</th>
                    </tr>
                    <tr>
                        <td colspan="2">2NT</td>
                        <td>邀請。有4張紅心。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3!S</td>
                        <td>4張以上黑桃，邀請。</td>
                    </tr>
                    <tr>
                        <td colspan="2">3NT</td>
                        <td>束叫。</td>
                    </tr>
                    <tr>
                        <td colspan="2">4!S</td>
                        <td>束叫。</td>
                    </tr>
                </table>
                
                </div>
            <div><h4>2!D/2!H Jacoby Transfer</h4>
                <table class="bidtable" id="1NT-2D">
                    <tr>
                        <th><a href="#1NT">1NT</a></th>
                        <th>2!D</th>
                        <th>轉換紅心。</th>
                    </tr>
                    <tr>
                        <td>2!H</td>
                        <td>Pass</td>
                        <td>束叫，5張紅心，未達邀請力量。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>2NT</td>
                        <td>5張紅心，邀請。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>3!H</td>
                        <td>6張以上紅心，邀請。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>3NT</td>
                        <td>5張紅心，迫叫成局。</td>
                    </tr>
                    <tr id="1NT-2H">
                        <th><a href="#1NT">1NT</a></th>
                        <th>2!H</th>
                        <th>轉換黑桃。不是5張黑桃的邀請牌。</th>
                    </tr>
                    <tr>
                        <td>2!S</td>
                        <td>Pass</td>
                        <td>束叫，5張黑桃，未達邀請力量。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>2NT</td>
                        <td>5張黑桃，邀請。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>3!S</td>
                        <td>6張以上黑桃，邀請。</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>3NT</td>
                        <td>5張黑桃，迫叫成局。</td>
                    </tr>
                </table> 
            </div>
            <div><h4>小整理</h4>
                <table>
                    <tr>
                        <th colspan="5">1NT首次答叫基本整理</th>
                    </tr>
                    <tr>
                        <td>點力的範圍</td>
                        <td>有六張以上高花</td>
                        <td>有五張高花</td>
                        <td>有四張高花</td>
                        <td>其他</td>
                    </tr>
                    <tr>
                        <td>0-7</td>
                        <td>2!D/2!H</td>
                        <td>2!D/2!H</td>
                        <td>PASS</td>
                        <td>PASS</td>
                    </tr>
                    <tr>
                        <td>8-9</td>
                        <td>2!D/2!H</td>
                        <td>2!D/2!H</td>
                        <td>2!C</td>
                        <td>2NT</td>
                    </tr>
                    <tr>
                        <td>10以上</td>
                        <td>2!D/2!H或4!D/4!H</td>
                        <td>2!D/2!H</td>
                        <td>2!C</td>
                        <td>3NT</td>
                    </tr>
                </table>
                <p>基本的特約名稱，簡介如下表：</p>
                <table>
                    <tr>
                        <th colspan="6">1NT首次答叫特約列表</th>
                    </tr>
                    <tr>
                        <td>叫品</td>
                        <td>名稱</td>
                        <td colspan="4">適用牌型</td>
                    </tr>
                    <tr>
                        <td>2!C</td>
                        <td>Stayman Convention</td>
                        <td colspan="4">邀請點力或以上（8+），有四張的高花</td>
                    </tr>
                    <tr>
                        <td>2!D/2!H</td>
                        <td>Jacoby Transfer</td>
                        <td colspan="4">任意點力（0+），有五張或以上的高花</td>
                    </tr>
                    <tr>
                        <td>4!D/4!H</td>
                        <td>Texas Transfer</td>
                        <td colspan="4">成局點力（10+），有六張以上的高花</td>
                    </tr>
                </table>
            </div>
        </div>
        <div><h2>敵方開叫以後</h2>
            <p>坐在右邊的敵人開叫以後，情況變得比較複雜，但仍然還是可以瞭解的。</p>
            <table class="defensive">
                <tr>
                    <th colspan="2">(1m)</th>
                </tr>
                <tr>
                    <td>Dbl.</td>
                    <td>Takeout
                        <ul>
                        <li> 除了開叫花色以外的各花色，都有至少3張支持。較不適合蓋叫的牌，12點以上。</li>
                        <li>17點以上，任何牌型（除了有擋張的17-18平均牌）。</li>
                    </ul></td>
                </tr>
                <tr>
                    <td>1!D</td>
                    <td>5張以上方塊，8點以上。</td>
                </tr>
                <tr>
                    <td>1!H</td>
                    <td>5張以上紅心，8點以上。</td>
                </tr>
                <tr>
                    <td>1!S</td>
                    <td>5張以上黑桃，8點以上。</td>
                </tr>
                <tr>
                    <td>1NT</td>
                    <td>(15)16-18點，類似平均牌型，敵方叫的花色有「擋張」。</td>
                </tr>
                <tr>
                    <td>2!C</td>
                    <td>1!D-2!C的情形，2!C是11點以上6張以上梅花，或13點以上，5張以上梅花。</td>
                </tr>
                <tr>
                    <td>2m</td>
                    <td>兩門高花5-5以上，10點以上。（Michaels）</td>
                </tr>
            </table>
            <p>高花開叫之後的蓋叫，使用的東西很類似。</p>
            <table class="defensive">
                <tr>
                    <th colspan="2">(1M)</th>
                </tr>
                <tr>
                    <td>Dbl.</td>
                    <td>Takeout
                        <ul>
                        <li> 除了開叫花色以外的各花色，都有至少3張支持。較不適合蓋叫的牌，12點以上。</li>
                        <li>17點以上，任何牌型（除了有擋張的17-18平均牌）。</li>
                    </ul></td>
                </tr>
                <tr>
                    <td>1!S</td>
                    <td>5張以上黑桃，8點以上。</td>
                </tr>
                <tr>
                    <td>1NT</td>
                    <td>(15)16-18點，類似平均牌型，敵方叫的花色有「擋張」。</td>
                </tr>
                <tr>
                    <td>2!C/!D</td>
                    <td>11點以上6張以上牌組，或13點以上，5張以上牌組。</td>
                </tr>
                <tr>
                    <td>2!H</td>
                    <td>1!S-2!H的情形，2!H是10點以上5張以上紅心。</td>
                </tr>
                <tr>
                    <td>2M</td>
                    <td>另一門高花以及一門低花5-5以上，10點以上。（Michaels）</td>
                </tr>
            </table>
            <p>還有一個共用的叫品，Unusual 2NT。</p>
            <table class="defensive">
                <tr>
                    <th colspan="2">(1m/1M)</th>
                </tr>
                <tr>
                    <td>2NT</td>
                    <td>兩門較低的未叫花色，5-5以上，10點以上。</td>
                </tr>
            </table>
            <ul>
                <li>蓋叫時的要求雖然是8個點，但並非所有8個點都蓋叫。我們蓋叫的兩個重要目標是指示首攻與找到適合的部分合約，因此，在牌組好的時候才建議8點蓋叫，否則應該在點力稍強的情況下才蓋叫。</li>
                <li>1NT蓋叫的擋張，指的是在那個花色不會被直接吃到太多墩。</li>
            </ul>
            <div><h3>答叫者Pass以後，Advancer（第四家）的叫牌</h3>
                <p>原則上叫出一線花色是迫叫，叫出二線花色不迫叫。叫對手的花色是強牌或對於同伴花色的好支持。</p>
            </div>
        </div>
    </article>
</template>
<script>
export default {
  mounted() {
    this.$root.replaceSuitSigns(this.$refs.Article);
    this.$root.genTOC();
    this.$root.$data.topic = "Tự Nhiên Chế";
  }
}
</script>
<style scoped>

</style>