import os #chatGPTのよびだし
from dotenv import load_dotenv
import chatgpt

X =[0,0,0,0,0] #Xで食品の個数を管理
y=['トマト','人参','大根','白菜','きゅうり']

mokuteki="料理"
mokuteki=+mokuteki #料理の条件を追加

    
def ryourigpt():#料理の提案
    load_dotenv(".env")
    chatbot = chatgpt.ChatBot(api_key = os.environ.get("OPENAI_API_KEY"))
    for i in range(len(X)):#食材の集計
        syokuzai=syokuzai+y[i]+"が"+str(y[i])+'個、'
    yosei='今、冷蔵庫に'+syokuzai+'あります。この食材を使って作ることのできる'+mokuteki+'を教えてください'
    message = chatbot.chat(yosei)
