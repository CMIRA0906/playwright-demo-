#!/bin/bash

echo "Stopping Playwright MCP Servers..."

# Function to stop a server
stop_server() {
    local name=$1
    local pid_file="${name}_server.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null; then
            echo "Stopping $name server (PID: $pid)..."
            kill $pid
            rm "$pid_file"
            echo "$name server stopped."
        else
            echo "$name server was not running."
            rm "$pid_file"
        fi
    else
        echo "No PID file found for $name server."
    fi
}

# Stop both servers
stop_server "playwright-official"
stop_server "playwright-executeautomation"

echo "All MCP servers stopped!"