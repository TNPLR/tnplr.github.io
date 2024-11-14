for n in range(1,46):
    with open(f"../../../../steven2357.github.io/bridge/Questions/Q{n}.html","r") as f:
        old=f.read()

    auction=""
    inds=old.index("<td>")
    inde=old.index("</td>")
    bid=old[inds+4:inde]
    while bid!="?":
        auction+=f'''{{
          "name": "{bid}",
          "explanation": "",
          "alert": false
        }},
        '''
        inds=old.index("<td>",inde)
        inde=old.index("</td>",inds)
        bid=old[inds+4:inde]

    auction=auction.replace("&spades;","S")
    auction=auction.replace("&hearts;","H")
    auction=auction.replace("&diamondsuit;","D")
    auction=auction.replace("&clubs;","C")


    new=f'''    {{
      "spades": "{old[old.index("&spades;")+8:old.index('''<br>
            <span style="color: red;">&hearts;''')]}",
      "hearts": "{old[old.index("&hearts;</span>")+15:old.index('''<br>
            <span style="color: red;">&diamondsuit;''')]}",
      "diamonds": "{old[old.index("&diamondsuit;</span>")+20:old.index('''<br>
            &clubs;''')]}",
      "clubs": "{old[old.index("&clubs;")+7:old.index('''
        </p>

        <table id="bidding">''')]}",
      "auction": [{auction[:-10]}],
      "answers": {{}},
      "correct": "{old[old.index("Correct()")+11:old.index("<",old.index("Correct()"))]}",
      "board_num": 1
    }},'''

    with open(f"Q{n}.txt","w") as f:
        f.write(new)
        print(f"寫入Q{n}.txt完成")