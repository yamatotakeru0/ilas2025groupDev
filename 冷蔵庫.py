x = [] #Xで食品の個数を管理
y = []#yで料理の名前を管理
mokuteki="料理"

from flask import  Flask  #の+ボタンを押されたとき
app = Flask(__name__)

def bottun_add():#ボタンの追加
    x.append(0)
    y.append()

@app.route('/plass_push_python_code', methods=['POST'])
def run_python_code():
    x[0] = x[0]+1 
    print("～を追加しました")

def ryourijouken():
    mokuteki=+mokuteki #料理の条件を追加
    return mokuteki    
    
def ryourigpt():#料理の提案
    import os #chatGPTのよびだし
    from dotenv import load_dotenv
    import chatgpt
    load_dotenv(".env")
    chatbot = chatgpt.ChatBot(api_key = os.environ.get("OPENAI_API_KEY"))
    for i in range(len(x)):#食材の集計
        syokuzai=syokuzai+y[i]+"が"+str(y[i])+'個、'
    yosei='今、冷蔵庫に'+syokuzai+'あります。この食材を使って作ることのできる'+mokuteki+'を教えてください'
    message = chatbot.chat(yosei)
    return message


