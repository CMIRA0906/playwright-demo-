#!/bin/bash

echo "Starting Playwright MCP Servers..."

# Function to start a server in background
start_server() {
    local name=$1
    local command=$2
    shift 2
    local args=("$@")
    
    echo "Starting $name server..."
    $command "${args[@]}" &
    local pid=$!
    echo "$name server started with PID: $pid"
    echo $pid > "${name}_server.pid"
}

# Start Official Playwright MCP Server
start_server "playwright-official" "npx" "@playwright/mcp@latest"

# Start ExecuteAutomation Playwright MCP Server
start_server "playwright-executeautomation" "npx" "@executeautomation/playwright-mcp-server"

echo "All MCP servers started!"
echo "To stop servers, run: ./stop-mcp-servers.sh"