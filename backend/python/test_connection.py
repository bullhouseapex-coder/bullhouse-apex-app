import MetaTrader5 as mt5
from datetime import datetime

print("MetaTrader5 package version:", mt5.__version__ )

if not mt5.initialize():
    print("initialize() failed")
    mt5.shutdown()
    quit()

print("✅ MT5 initialized successfully")

login = 5046481737
password = "1iMfWz_z"
server = "MetaQuotes-Demo"

authorized = mt5.login(login, password, server)

if not authorized:
    print("❌ Failed to connect to account")
    print("Error code:", mt5.last_error())
    mt5.shutdown()
    quit()

print(f"✅ Connected to account #{login}")

account_info = mt5.account_info()
if account_info is not None:
    print("\n📊 Account Information:")
    print(f"  Balance: ${account_info.balance:.2f}")
    print(f"  Equity: ${account_info.equity:.2f}")
    print(f"  Profit: ${account_info.profit:.2f}")
    print(f"  Margin: ${account_info.margin:.2f}")
    print(f"  Free Margin: ${account_info.margin_free:.2f}")
    print(f"  Leverage: 1:{account_info.leverage}")
    print(f"  Server: {account_info.server}")
    print(f"  Currency: {account_info.currency}")

# Shut down connection
mt5.shutdown()
print("\n✅ Connection closed")