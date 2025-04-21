
echo -e "OS: \n  $(lsb_release -a 2> /dev/null || sw_vers -productVersion)"
echo -e "Solana CLI: \n  $(solana -V)"
echo -e "Anchor: \n  $(anchor --version)"
echo -e "Node: \n  $(node --version)"
echo -e "Rust: \n  $(rustc -V)"
# Cut the first line of the output
echo -e "build-sbf version: \n  $(cargo build-sbf --version | head -n 1)"
echo -e "proc-macro2: \n  $(cargo tree -p proc-macro2 | head -n 1)"

echo -e "\n\nPath: \n$(echo $PATH | tr ':' '\n' | sort)"
