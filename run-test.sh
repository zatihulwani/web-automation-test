#!/bin/bash

# Script untuk menjalankan test di Mac/Linux

echo ""
echo "╔═════════════════════════════════════════╗"
echo "║   Web Automation Test Helper Script      ║"
echo "╚═════════════════════════════════════════╝"
echo ""

echo "Pilih opsi:"
echo "1. Install dependencies (npm install)"
echo "2. Run test dengan GUI (npm run test)"
echo "3. Run test headless (npm run test:headless)"
echo "4. Run test dengan Chrome (npm run test:chrome)"
echo "5. Run test dengan Firefox (npm run test:firefox)"
echo "6. Clear npm cache dan reinstall"
echo "7. Exit"
echo ""

read -p "Masukkan pilihan (1-7): " choice

case $choice in
    1)
        echo "Installing dependencies..."
        npm install
        ;;
    2)
        echo "Running test with GUI..."
        npm run test
        ;;
    3)
        echo "Running test headless..."
        npm run test:headless
        ;;
    4)
        echo "Running test with Chrome..."
        npm run test:chrome
        ;;
    5)
        echo "Running test with Firefox..."
        npm run test:firefox
        ;;
    6)
        echo "Clearing cache..."
        rm -rf node_modules package-lock.json
        npm install
        echo "Done!"
        ;;
    7)
        echo "Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac
