import MetaTrader5 as mt5
import pandas as pd
from datetime import datetime, timedelta
from collections import namedtuple

class MT5DataFetcher:
    def __init__(self, login, password, server):
        self.login = login
        self.password = password
        self.server = server
    
    def connect(self):
        try: 
            if not mt5.initialize():
                print("MT5 Initialization Failed")
                return False

            authorized = mt5.login(self.login, self.password, self.server)

            if not authorized:
                print(f"Login Failed, error code: {mt5.last_error()}")
                mt5.shutdown()
                return False
            
            print(f"Connected to Account: {self.login}")
            return True
        
        except Exception as e:
            print("Unexpected Error:", e)
            return False
    
    def get_account_information(self):
        try: 
            account_info = mt5.account_info()

            if account_info is None:
                print("Failed to get Account information")
                return False
            
            return {
                'name': account_info.name,
                'server': account_info.server,
                'company': account_info.company,
                'balance': account_info.balance,
                'equity': account_info.equity,
                'profit': account_info.profit,
                'margin': account_info.margin,
                'free_margin': account_info.margin_free,
                'margin_level': account_info.margin_level,
                'leverage': account_info.leverage,
                'currency': account_info.currency,
            }
            
        except Exception as e:
            print("Unexpected Error", e)
            return False
        
    def get_open_positions(self):
        try:
            positions = mt5.positions_get()

            return positions
        
        except Exception as e:
            print("Unexpected Error:",e)
            return False

    def get_history_deals(self, days=7):
        date_from = datetime.now() - timedelta(days=days)
        date_to = datetime.now()

        deals = mt5.history_deals_get(date_from, date_to)

        closed_deals = [d for d in deals if d.entry == mt5.DEAL_ENTRY_OUT]
        return closed_deals   

    def disconnect(self):
        mt5.shutdown()
        print("Disconnected from MT5")




if __name__ == "__main__":
    
    login = 5046481737
    password = "1iMfWz_z"
    server = "MetaQuotes-Demo"

    fetcher = MT5DataFetcher(login, password, server)

    if fetcher.connect():
        account_data = fetcher.get_account_information()
        df = pd.DataFrame(list(account_data.items()), columns=["propeties", "values"])
        print(df)

        trade_history = fetcher.get_history_deals()

        
        print("\nTrade History: ", len(trade_history))
        history_df = pd.DataFrame(list(trade_history), columns=trade_history[0]._asdict().keys())
        history_df['time'] = pd.to_datetime(history_df['time'], unit='s')
        print(history_df)

        fetcher.disconnect()

    print(__name__)