import { SyllabusItem, Question, VivaQuestion } from './types';

export const COURSE_INFO = {
  code: "CSEG1126",
  name: "Linux Lab",
  units: 12,
  contactHours: 60,
  prerequisites: "Syllabus version 1.0",
  textbooks: [
    "Dayanand Ambawade, and Deven Shah, \"Linux Labs and Open Source Technologies\"",
    "Paul W Browning, \"101 Labs - Linux LPIC1\""
  ]
};

export const SYLLABUS: SyllabusItem[] = [
  {
    experiment: 1,
    title: "Linux Installation & Fundamentals",
    theory: "Linux history, philosophy, distributions, and installation.",
    labTasks: ["Install VMware/VirtualBox", "Install Linux Distro", "Basic GUI Nav", "VI Editor Basics"],
    details: `# Key Topics
- Linux history and philosophy
- Linux distributions (Ubuntu, Fedora, CentOS, Debian)
- Advantages of Linux (Open-source, Multi-user, Multitasking, Portable, Secure)
- Installing Linux on VMware or VirtualBox
- Linux GUI and basic navigation
- Introduction to VI/VIM editor

# Basic VI Editor Commands
| Command | Purpose |
| :wq | Save and exit |
| :q! | Exit without saving |
| dd | Delete a line |
| yy | Copy a line |
| p | Paste |
| i | Insert mode |
| o | New line |
| Esc | Return to command mode |

# VI Editor Example - Creating a Script
\`\`\`bash
vi hello.sh
# Press i to insert
#!/bin/bash
echo "Welcome to Linux Lab"
# Press Esc, then :wq to save
\`\`\``
  },
  {
    experiment: 2,
    title: "Basic Commands",
    theory: "Navigation, File Operations, View/Edit Content, User/System commands.",
    labTasks: ["ls, cd, pwd, mkdir", "cp, mv, rm", "cat, more, less", "who, uname, df"],
    details: `# Navigation Commands
\`\`\`bash
# Print working directory
pwd

# List files
ls
ls -l          # Long format with details
ls -a          # Show hidden files
ls -h          # Human-readable file sizes

# Change directory
cd /home
cd ~           # Home directory
cd ..          # Parent directory
cd -           # Previous directory

# Create directory
mkdir mydir
mkdir -p a/b/c # Create nested directories

# Remove empty directory
rmdir mydir
\`\`\`

# File Operations
\`\`\`bash
# Create empty file
touch filename.txt

# Copy files
cp source.txt destination.txt
cp -r sourcedir/ destdir/    # Recursive copy

# Move/Rename files
mv oldname.txt newname.txt
mv file.txt /path/to/destination/

# Remove files
rm filename.txt
rm -f file.txt       # Force remove without confirmation
rm -r directory/     # Remove directory recursively
\`\`\`

# View/Edit File Content
\`\`\`bash
# Display entire file
cat filename.txt

# View file one page at a time
more filename.txt
less filename.txt

# Display first 10 lines
head filename.txt
head -n 20 filename.txt

# Display last 10 lines
tail filename.txt
tail -n 5 filename.txt

# Edit file with nano
nano filename.txt

# Edit file with VI
vi filename.txt
\`\`\`

# User & System Commands
\`\`\`bash
# Current user
whoami

# All logged-in users
who
w

# Change password
passwd

# System information
uname -a          # All information
df -h             # Disk usage
top               # Real-time processes
history 10        # Last 10 commands
\`\`\``
  },
  {
    experiment: 3,
    title: "Advanced File Operations",
    theory: "Permissions, Searching, Compression, Archives, Links.",
    labTasks: ["chmod, chown", "find, grep", "tar, gzip", "ln (hard/soft)"],
    details: `# Permissions & Ownership
\`\`\`bash
# View permissions
ls -l
# File format: -rwxrwxrwx (user, group, others)
# r=read(4), w=write(2), x=execute(1)

# Change permissions
chmod 755 filename    # rwxr-xr-x
chmod 777 filename    # rwxrwxrwx
chmod u+x filename    # Add execute for user

# Change owner/group
chown newuser filename
chgrp newgroup filename
\`\`\`

# Searching & Finding Files
\`\`\`bash
# Find files
find / -name "*.txt"
find . -type f -name "test*"
find . -size +100M

# Grep content
grep "pattern" filename.txt
grep -r "text" directory/
\`\`\`

# Compression & Archives
\`\`\`bash
# Tar archive
tar -cvf archive.tar file1 file2
tar -xvf archive.tar

# Gzip
tar -czvf archive.tar.gz directory/
tar -xzvf archive.tar.gz
\`\`\`

# Links
\`\`\`bash
# Hard link
ln original.txt hardlink.txt

# Soft/Symbolic link
ln -s /path/to/original softlink.txt
\`\`\``
  },
  {
    experiment: 4,
    title: "Shell Scripting Basics",
    theory: "Structure, Variables, Arithmetic, Basic Inputs.",
    labTasks: ["Shebang", "Variables", "Math ops", "Voting Eligibility"],
    details: `# Concept
Shell scripting automates repetitive tasks by creating executable text files containing Linux commands.

# Script Structure
\`\`\`bash
#!/bin/bash           # Shebang
# This is a comment
\`\`\`
Make executable: \`chmod +x script.sh\`

# 1. Print Messages
\`\`\`bash
#!/bin/bash
echo "Hello, World!"
\`\`\`

# 2. Variables
\`\`\`bash
#!/bin/bash
name="John"
echo "Name: $name"
# Read input
echo "Enter your name:"
read name
\`\`\`

# 3. Arithmetic Operations
\`\`\`bash
#!/bin/bash
read a b
echo "Sum: $((a + b))"
echo "Power: $((a ** 2))"
\`\`\`

# 4. Basic Conditional
\`\`\`bash
#!/bin/bash
read age
if [ $age -ge 18 ]; then
  echo "Eligible to vote."
else
  echo "Not eligible."
fi
\`\`\``
  },
  {
    experiment: 5,
    title: "Decision Making & Conditionals",
    theory: "Operators, If-Else, Prime Check, Sum of Digits, Armstrong Number.",
    labTasks: ["Prime Check", "Sum of Digits", "Armstrong Check"],
    details: `# Conditional Operators
-eq, -ne, -lt, -le, -gt, -ge

# Prime Number Check
\`\`\`bash
#!/bin/bash
read num
if [ $num -lt 2 ]; then
  echo "Not prime"
else
  is_prime=1
  for ((i=2; i<=num/2; i++)); do
    if [ $((num % i)) -eq 0 ]; then
      is_prime=0
      break
    fi
  done
  if [ $is_prime -eq 1 ]; then echo "Prime"; else echo "Not Prime"; fi
fi
\`\`\`

# Sum of Digits
\`\`\`bash
#!/bin/bash
read num
sum=0
while [ $num -gt 0 ]; do
  digit=$((num % 10))
  sum=$((sum + digit))
  num=$((num / 10))
done
echo "Sum: $sum"
\`\`\`

# Armstrong Number
\`\`\`bash
#!/bin/bash
# 153 = 1^3 + 5^3 + 3^3
read num
n=$num
sum=0
digits=\${#num}

while [ $n -gt 0 ]; do
  digit=$((n % 10))
  sum=$((sum + digit ** digits))
  n=$((n / 10))
done

if [ $sum -eq $num ]; then echo "Armstrong"; else echo "Not Armstrong"; fi
\`\`\``
  },
  {
    experiment: 6,
    title: "Loops & Data Manipulation",
    theory: "For/While Loops, Palindrome, GCD/LCM, Sorting.",
    labTasks: ["Palindrome", "GCD & LCM", "Array Sorting"],
    details: `# Loops
\`\`\`bash
# For Loop
for i in {1..5}; do echo $i; done

# While Loop
i=1
while [ $i -le 5 ]; do
  echo $i
  ((i++))
done
\`\`\`

# Palindrome Number
\`\`\`bash
#!/bin/bash
read num
temp=$num
rev=0
while [ $temp -gt 0 ]; do
  digit=$((temp % 10))
  rev=$((rev * 10 + digit))
  temp=$((temp / 10))
done
if [ $rev -eq $num ]; then echo "Palindrome"; else echo "Not Palindrome"; fi
\`\`\`

# GCD & LCM
\`\`\`bash
#!/bin/bash
read a b
i=$a; j=$b
while [ $j -ne 0 ]; do
  r=$((i % j))
  i=$j; j=$r
done
echo "GCD: $i"
echo "LCM: $(( (a * b) / i ))"
\`\`\`

# Bubble Sort
\`\`\`bash
#!/bin/bash
read -a arr
n=\${#arr[@]}
for ((i=0; i<n; i++)); do
  for ((j=i+1; j<n; j++)); do
    if [ \${arr[i]} -gt \${arr[j]} ]; then
      temp=\${arr[i]}
      arr[i]=\${arr[j]}
      arr[j]=$temp
    fi
  done
done
echo "Sorted: \${arr[@]}"
\`\`\``
  },
  {
    experiment: 7,
    title: "File & Process Operations",
    theory: "File existence, Loop printing, File Stats, Functions.",
    labTasks: ["Check File", "Print 1-10", "File Word Count", "Factorial Function"],
    details: `# Check File Existence
\`\`\`bash
#!/bin/bash
read file
if [ -f "$file" ]; then
  cat "$file"
else
  touch "$file"
  echo "Created $file"
fi
\`\`\`

# Count Lines, Words, Chars
\`\`\`bash
#!/bin/bash
read file
if [ -f "$file" ]; then
  wc "$file"
else
  echo "File not found"
fi
\`\`\`

# Factorial (Function)
\`\`\`bash
#!/bin/bash
factorial() {
  n=$1
  fact=1
  for ((i=1; i<=n; i++)); do
    fact=$((fact * i))
  done
  echo $fact
}
echo "Factorial of 5 is $(factorial 5)"
\`\`\``
  },
  {
    experiment: 8,
    title: "Permissions & String Operations",
    theory: "File permissions checks, String ops, Grep patterns, System info.",
    labTasks: ["Check r/w/x", "String ops", "Grep pattern", "System Report"],
    details: `# Check File Permissions
\`\`\`bash
#!/bin/bash
read file
[ -r "$file" ] && echo "Readable"
[ -w "$file" ] && echo "Writable"
[ -x "$file" ] && echo "Executable"
\`\`\`

# String Operations
\`\`\`bash
#!/bin/bash
read str1
read str2
echo "Length: \${#str1}"
echo "Concat: $str1$str2"
if [ "$str1" = "$str2" ]; then echo "Equal"; else echo "Not Equal"; fi
echo "Upper: \${str1^^}"
\`\`\`

# Pattern Search
\`\`\`bash
#!/bin/bash
read pattern
read file
grep "$pattern" "$file" && echo "Found" || echo "Not Found"
\`\`\`

# System Info
\`\`\`bash
#!/bin/bash
date
who
uptime
df -h | head -5
\`\`\``
  },
  {
    experiment: 9,
    title: "File Automation & Search",
    theory: "Rename files, Search by ext, Fibonacci.",
    labTasks: ["Rename with prefix", "Find by extension", "Fibonacci"],
    details: `# Rename Files with Prefix
\`\`\`bash
#!/bin/bash
read prefix
for file in *; do
  [ -f "$file" ] && mv "$file" "\${prefix}_\${file}"
done
\`\`\`

# Search by Extension
\`\`\`bash
#!/bin/bash
read dir
read ext
find "$dir" -type f -name "*$ext"
\`\`\`

# Fibonacci Series
\`\`\`bash
#!/bin/bash
read n
a=0; b=1
echo -n "$a $b "
for ((i=2; i<n; i++)); do
  c=$((a + b))
  echo -n "$c "
  a=$b; b=$c
done
\`\`\``
  },
  {
    experiment: 10,
    title: "String Operations (Advanced)",
    theory: "Length, Reverse, Concatenate, Extraction.",
    labTasks: ["Length calculation", "Reverse string", "Concatenate"],
    details: `# String Reverse
\`\`\`bash
#!/bin/bash
read str
rev=""
len=\${#str}
for ((i=len-1; i>=0; i--)); do
  rev="$rev\${str:i:1}"
done
echo "Reversed: $rev"
# OR
echo $str | rev
\`\`\`

# Extraction & Manipulation
\`\`\`bash
str="Welcome to Linux"
echo "\${str:0:7}"       # Substring
echo "\${str/Linux/Unix}" # Replace
\`\`\``
  },
  {
    experiment: 11,
    title: "Sentence Parsing & Palindrome",
    theory: "Split words, String Palindrome.",
    labTasks: ["Sentence split", "String Palindrome Check"],
    details: `# Split Sentence
\`\`\`bash
#!/bin/bash
read sentence
for word in $sentence; do
  echo $word
done
\`\`\`

# String Palindrome
\`\`\`bash
#!/bin/bash
read str
# Remove spaces, to lower
clean=$(echo "$str" | tr -d ' ' | tr 'A-Z' 'a-z')
rev=$(echo "$clean" | rev)
if [ "$clean" = "$rev" ]; then echo "Palindrome"; else echo "Not Palindrome"; fi
\`\`\`

# Character Frequency
\`\`\`bash
echo "hello" | grep -o . | sort | uniq -c
\`\`\``
  },
  {
    experiment: 12,
    title: "Rule-Based Expert System",
    theory: "Automation logic, Case statements, Medical/Grade examples.",
    labTasks: ["Medical Diagnosis", "Grade Classifier", "Loan Eligibility"],
    details: `# Simple Medical System
\`\`\`bash
#!/bin/bash
echo "Enter symptom (fever/sore throat/cough):"
read symptom
case "$symptom" in
  fever) echo "Take fever reducer";;
  "sore throat") echo "Gargle warm water";;
  cough) echo "Take cough syrup";;
  *) echo "Consult doctor";;
esac
\`\`\`

# Grade Classification
\`\`\`bash
#!/bin/bash
read marks
if [ $marks -ge 90 ]; then echo "Grade A"
elif [ $marks -ge 80 ]; then echo "Grade B"
elif [ $marks -ge 50 ]; then echo "Pass"
else echo "Fail"; fi
\`\`\`

# Loan Eligibility
\`\`\`bash
#!/bin/bash
read income
read credit
if [ $income -gt 300000 ] && [ $credit -gt 650 ]; then
  echo "Approved"
else
  echo "Rejected"
fi
\`\`\``
  }
];

export const INITIAL_MCQS: Question[] = [
  { id: 1, question: "Which command is used to list files in a directory?", options: ["cp", "mv", "ls", "pwd"], correctAnswer: 2, explanation: "'ls' lists directory contents." },
  { id: 2, question: "What does pwd show?", options: ["Password", "Print Working Directory", "Process ID", "Previous Directory"], correctAnswer: 1, explanation: "'pwd' prints the current working directory path." },
  { id: 3, question: "How to create a new directory?", options: ["touch", "mkfile", "mkdir", "dir"], correctAnswer: 2, explanation: "'mkdir' creates a new directory." },
  { id: 4, question: "Which command copies files?", options: ["ls", "cp", "rm", "mv"], correctAnswer: 1, explanation: "'cp' stands for copy." },
  { id: 5, question: "What is the default text editor in most Linux distros?", options: ["Notepad", "Word", "Vi/Vim/Nano", "TextEdit"], correctAnswer: 2, explanation: "Vi, Vim, or Nano are standard terminal editors." },
  { id: 6, question: "Which command changes file permissions?", options: ["chown", "chmod", "chgrp", "rm"], correctAnswer: 1, explanation: "'chmod' changes file mode (permissions)." },
  { id: 7, question: "What does sudo do?", options: ["SuperUser Do", "System Do", "Shut Down", "Stop User"], correctAnswer: 0, explanation: "Executes commands with superuser privileges." },
  { id: 8, question: "How to view running processes?", options: ["ls", "ps", "pwd", "cd"], correctAnswer: 1, explanation: "'ps' displays process status." },
  { id: 9, question: "Which command shows disk usage?", options: ["du", "df", "dd", "ds"], correctAnswer: 1, explanation: "'df' reports file system disk space usage." },
  { id: 10, question: "What is the function of chmod 777 filename?", options: ["Read only", "Write only", "Full permissions for all", "No permissions"], correctAnswer: 2, explanation: "777 gives read, write, and execute to owner, group, and others." },
  { id: 11, question: "Which command displays currently logged in users?", options: ["who", "where", "why", "when"], correctAnswer: 0, explanation: "'who' shows who is logged on." },
  { id: 12, question: "How to change your password in Linux?", options: ["pwd", "pass", "passwd", "changepass"], correctAnswer: 2, explanation: "'passwd' updates the user's authentication token(s)." },
  { id: 13, question: "What symbol represents the root user's home directory?", options: ["~", "/", "/root", "#"], correctAnswer: 2, explanation: "~ is current user home, but for root explicitly it is /root. However, ~ for root IS /root." },
  { id: 14, question: "The command to display first ten lines of a file is?", options: ["tail", "head", "top", "first"], correctAnswer: 1, explanation: "'head' defaults to the first 10 lines." },
  { id: 15, question: "How do you move a file in Linux?", options: ["cp", "mv", "rm", "ls"], correctAnswer: 1, explanation: "'mv' moves or renames files." },
  { id: 16, question: "Which command removes an empty directory?", options: ["rm", "rmdir", "del", "remove"], correctAnswer: 1, explanation: "'rmdir' removes empty directories." },
  { id: 17, question: "Which shell is most commonly used in Linux?", options: ["cmd", "powershell", "bash", "ksh"], correctAnswer: 2, explanation: "BASH (Bourne Again SHell) is standard." },
  { id: 18, question: "What's the purpose of grep?", options: ["Copy files", "Search text patterns", "Remove files", "List files"], correctAnswer: 1, explanation: "grep searches for patterns in files." },
  { id: 19, question: "Name the command to show system information.", options: ["sysinfo", "uname", "info", "system"], correctAnswer: 1, explanation: "'uname' prints system information." },
  { id: 20, question: "How to create an empty file?", options: ["mkdir", "touch", "cat", "nano"], correctAnswer: 1, explanation: "'touch' updates timestamps or creates an empty file." },
  { id: 21, question: "Which option with ls provides detailed info?", options: ["-a", "-l", "-h", "-r"], correctAnswer: 1, explanation: "-l stands for long listing format." },
  { id: 22, question: "To search files by name in a directory, you use?", options: ["grep", "find", "locate", "search"], correctAnswer: 1, explanation: "'find' searches the directory tree." },
  { id: 23, question: "What is the function of tar?", options: ["Compress", "Archive", "Encrypt", "Delete"], correctAnswer: 1, explanation: "Tape ARchiver, used to group files into one archive file." },
  { id: 24, question: "Which command compresses files?", options: ["tar", "gzip", "cat", "ls"], correctAnswer: 1, explanation: "gzip compresses files." },
  { id: 25, question: "What does $HOME represent?", options: ["Root directory", "Current directory", "User's home directory", "System bin"], correctAnswer: 2, explanation: "Environment variable for the current user's home." },
  { id: 26, question: "How to append output to an existing file?", options: [">", ">>", "<", "|"], correctAnswer: 1, explanation: ">> appends stdout to a file." },
  { id: 27, question: "Which command displays the last command executed?", options: ["last", "history", "previous", "cmd"], correctAnswer: 1, explanation: "history shows command history." },
  { id: 28, question: "What does cat > test.txt do?", options: ["Reads test.txt", "Overwrites/Creates test.txt with input", "Appends to test.txt", "Deletes test.txt"], correctAnswer: 1, explanation: "Redirects stdin to overwrite/create the file." },
  { id: 29, question: "To view the last few lines of a file, use?", options: ["head", "top", "tail", "end"], correctAnswer: 2, explanation: "'tail' shows the end of a file." },
  { id: 30, question: "How do you run a shell script?", options: ["./script.sh", "run script", "start script", "go script"], correctAnswer: 0, explanation: "./ specifies current directory execution." },
  { id: 31, question: "The command to change ownership of a file is?", options: ["chmod", "chown", "chgrp", "chuser"], correctAnswer: 1, explanation: "'chown' changes file owner." },
  { id: 32, question: "What is the extension of shell script files?", options: [".exe", ".bat", ".sh", ".bin"], correctAnswer: 2, explanation: ".sh is the convention for shell scripts." },
  { id: 33, question: "How do you check current date and time?", options: ["time", "now", "date", "calendar"], correctAnswer: 2, explanation: "'date' displays system date and time." },
  { id: 34, question: "Which command schedules processes?", options: ["cron", "time", "plan", "sched"], correctAnswer: 0, explanation: "Cron is the time-based job scheduler." },
  { id: 35, question: "How do you start a script in background?", options: ["&", "*", "%", "#"], correctAnswer: 0, explanation: "Appending '&' runs the command in background." },
  { id: 36, question: "What's the command to create a symbolic link?", options: ["ln", "ln -s", "link", "sym"], correctAnswer: 1, explanation: "ln -s creates a symbolic (soft) link." },
  { id: 37, question: "Which variable holds positional parameters?", options: ["$1, $2...", "$a, $b...", "$x, $y...", "#1, #2..."], correctAnswer: 0, explanation: "$1 is first arg, $2 is second, etc." },
  { id: 38, question: "How do you exit from vi editor?", options: ["Ctrl+C", ":wq or :q!", "Exit", "Esc+E"], correctAnswer: 1, explanation: ":wq (write quit) or :q! (quit force)." },
  { id: 39, question: "To display history of commands, you use?", options: ["mem", "history", "log", "past"], correctAnswer: 1, explanation: "Command 'history'." },
  { id: 40, question: "What's the result of echo $USER?", options: ["Hostname", "Current Username", "Root", "Nothing"], correctAnswer: 1, explanation: "$USER env var holds current username." },
  { id: 41, question: "How to check users in the system?", options: ["cat /etc/passwd", "ls /users", "check user", "users list"], correctAnswer: 0, explanation: "/etc/passwd file contains user info." },
  { id: 42, question: "What operator is used for piping?", options: [">", "<", "|", ";"], correctAnswer: 2, explanation: "'|' pipes output of one command to input of another." },
  { id: 43, question: "Which command is used to display environment variables?", options: ["env", "var", "show", "display"], correctAnswer: 0, explanation: "'env' or 'printenv'." },
  { id: 44, question: "What does find . -type f do?", options: ["Finds folders", "Finds all files", "Finds failed processes", "Finds text"], correctAnswer: 1, explanation: "-type f specifies looking for files." },
  { id: 45, question: "How do you check file permissions of a file?", options: ["ls", "ls -l", "check perm", "chmod"], correctAnswer: 1, explanation: "ls -l shows the permission string." },
  { id: 46, question: "What is the difference between > and >> in redirection?", options: ["> appends, >> overwrites", "> overwrites, >> appends", "No difference", "One is for error"], correctAnswer: 1, explanation: "> truncates then writes, >> appends." },
  { id: 47, question: "Name the default shell in Ubuntu.", options: ["zsh", "fish", "bash", "ksh"], correctAnswer: 2, explanation: "Bash is default." },
  { id: 48, question: "Which command is used to change the group ownership?", options: ["chown", "chmod", "chgrp", "group"], correctAnswer: 2, explanation: "'chgrp' changes group." },
  { id: 49, question: "What does rm -rf / do?", options: ["Cleans temp files", "Deletes everything (Dangerous)", "Restarts system", "Nothing"], correctAnswer: 1, explanation: "Recursively forces deletion from root. Destroys system." },
  { id: 50, question: "How do you stop a currently running process?", options: ["stop", "kill", "end", "halt"], correctAnswer: 1, explanation: "'kill' sends a signal to terminate a process." }
];

export const INITIAL_VIVA: VivaQuestion[] = [
  { id: 1, question: "Explain the basic architecture of Linux OS.", answer: "It consists of Hardware, Kernel (core), Shell (interface), and Utilities/Applications.", category: "Basic" },
  { id: 2, question: "How is Linux different from UNIX?", answer: "Linux is open-source and free; UNIX is often proprietary. Linux kernel was written by Linus Torvalds.", category: "Basic" },
  { id: 3, question: "Describe the function of the kernel.", answer: "The kernel manages hardware resources (CPU, Memory, I/O) and facilitates communication between software and hardware.", category: "Intermediate" },
  { id: 4, question: "What is the significance of file permissions?", answer: "They secure the system by controlling who can read, write, or execute files, preventing unauthorized access.", category: "Basic" },
  { id: 5, question: "How would you add a new user in Linux?", answer: "Using 'useradd username' or 'adduser username' (more interactive) command, usually with sudo.", category: "Intermediate" },
  { id: 6, question: "Why are shells important in Linux?", answer: "The shell acts as the command interpreter, bridging the user and the kernel.", category: "Basic" },
  { id: 7, question: "Explain the usage of chmod.", answer: "Used to change file modes. E.g., 'chmod 755 file' gives Owner full rights, others read/execute.", category: "Intermediate" },
  { id: 8, question: "Describe how you would backup a directory.", answer: "Using 'tar -cvf backup.tar directory/' or 'cp -r directory backup_dir'.", category: "Intermediate" },
  { id: 9, question: "What is the function of process scheduling?", answer: "It determines which process runs on the CPU and for how long, allowing multitasking.", category: "Advanced" },
  { id: 10, question: "How does shell scripting help automation?", answer: "It groups commands into a file to execute complex sequences or repetitive tasks automatically.", category: "Basic" },
  { id: 11, question: "Define hard link and soft link.", answer: "Hard Link: Direct mirror of file data (inode). Soft Link: Pointer/Shortcut to the file path.", category: "Intermediate" },
  { id: 12, question: "Difference between cat, less, and more?", answer: "cat: dumps whole file. more: page by page. less: page by page with backward navigation (more powerful).", category: "Basic" },
  { id: 13, question: "Purpose of the passwd command?", answer: "Used to change or set a user account's password.", category: "Basic" },
  { id: 14, question: "What is an environment variable?", answer: "A named value (like PATH or USER) that affects how running processes will behave.", category: "Intermediate" },
  { id: 15, question: "Describe the life cycle of a process.", answer: "Created (fork), Ready, Running, Waiting/Blocked, Terminated (Zombie/Death).", category: "Advanced" },
  { id: 16, question: "What is the significance of redirection and piping?", answer: "Redirection directs I/O to/from files. Piping (|) connects stdout of one command to stdin of another.", category: "Intermediate" },
  { id: 17, question: "How do you search for files with a specific extension?", answer: "find . -name '*.txt'", category: "Intermediate" },
  { id: 18, question: "What are the types of shells available?", answer: "Bash, Sh, Csh, Ksh, Zsh, Fish.", category: "Basic" },
  { id: 19, question: "Explain decision making in shell scripts.", answer: "Using if-else statements or case statements to execute code based on conditions.", category: "Basic" },
  { id: 20, question: "How does grep work?", answer: "It scans input line by line looking for matches to a specified pattern/regex and prints matching lines.", category: "Intermediate" },
  { id: 21, question: "How can you monitor memory usage?", answer: "Using 'free -h', 'top', or 'cat /proc/meminfo'.", category: "Basic" },
  { id: 22, question: "What does df -h show?", answer: "Disk usage of file systems in human-readable format (GB/MB).", category: "Basic" },
  { id: 23, question: "How do you compress and decompress files?", answer: "Compress: gzip file. Decompress: gunzip file.gz. Or using tar with -z flag.", category: "Intermediate" },
  { id: 24, question: "Explain positional parameters in shell scripting.", answer: "$1, $2, etc., represent arguments passed to the script from command line.", category: "Advanced" },
  { id: 25, question: "How to make scripts executable?", answer: "chmod +x scriptname.sh", category: "Basic" },
  { id: 26, question: "What is the importance of script debugging?", answer: "To find errors in logic or syntax. Use 'bash -x script.sh' to trace execution.", category: "Intermediate" },
  { id: 27, question: "Describe a scenario for process synchronization.", answer: "When two processes need to access shared resource (like a file) without corrupting it.", category: "Advanced" },
  { id: 28, question: "How do you kill a process?", answer: "Find PID using ps/top, then run 'kill PID' or 'kill -9 PID' to force.", category: "Basic" },
  { id: 29, question: "Explain job control in Linux.", answer: "Managing foreground/background jobs using &, Ctrl+Z, fg, bg, jobs commands.", category: "Advanced" },
  { id: 30, question: "What is interactive scripting?", answer: "Scripts that pause to ask users for input using 'read' command.", category: "Basic" },
  { id: 31, question: "Describe the steps to install Linux in VM.", answer: "Download ISO, Create VM in Hypervisor, Allocate RAM/Disk, Boot from ISO, Follow Installer.", category: "Basic" },
  { id: 32, question: "How do you handle errors in shell scripts?", answer: "Check exit status ($?) of commands, use if checks, or 'set -e' to exit on error.", category: "Advanced" },
  { id: 33, question: "What is a cron job?", answer: "A scheduled task that runs automatically at specific times/dates managed by the cron daemon.", category: "Intermediate" },
  { id: 34, question: "How do you concatenate two files?", answer: "cat file1 file2 > newfile", category: "Basic" },
  { id: 35, question: "Explain string comparison in shell scripting.", answer: "Using operators like = (equal), != (not equal), -z (empty) inside [ ].", category: "Intermediate" },
  { id: 36, question: "Difference between foreground and background processes?", answer: "Foreground holds the terminal. Background runs independently allowing terminal use.", category: "Intermediate" },
  { id: 37, question: "How can you check disk usage statistics?", answer: "df for file systems, du for directory space usage.", category: "Basic" },
  { id: 38, question: "What is an expert system in context of shell scripting?", answer: "A script with logic rules (if-else/case) that mimics decision making (e.g., diagnosis).", category: "Advanced" },
  { id: 39, question: "How do you manage daemons/services?", answer: "Using systemctl (systemd) or service command: start, stop, restart, enable.", category: "Advanced" },
  { id: 40, question: "Explain the concept of mounting filesystems.", answer: "Attaching a storage device/partition to a directory in the main directory tree to access it.", category: "Advanced" },
  { id: 41, question: "Difference between absolute and relative paths?", answer: "Absolute starts from / (root). Relative starts from current directory.", category: "Basic" },
  { id: 42, question: "How do you interact with users in shell scripts?", answer: "Using 'echo' to display prompts and 'read' to capture input.", category: "Basic" },
  { id: 43, question: "Describe parsing in shell scripts.", answer: "Breaking down data (like strings or files) into components to process (e.g., separating words).", category: "Advanced" },
  { id: 44, question: "What does chown do?", answer: "Changes ownership of files/directories.", category: "Basic" },
  { id: 45, question: "What is the output of uname -r?", answer: "The version release number of the kernel.", category: "Intermediate" },
  { id: 46, question: "How would you find all files larger than 1GB?", answer: "find . -size +1G", category: "Intermediate" },
  { id: 47, question: "Significance of root user in Linux?", answer: "Superuser with unlimited privileges to modify system files and configuration.", category: "Basic" },
  { id: 48, question: "How do you check the number of users logged in?", answer: "who | wc -l", category: "Intermediate" },
  { id: 49, question: "Explain the use of shell functions.", answer: "Reusable code blocks within a script to avoid repetition and organize logic.", category: "Intermediate" },
  { id: 50, question: "Why is documentation important for scripts?", answer: "To explain logic for others (or future self), maintainability, and debugging.", category: "Basic" }
];

export const AI_SYSTEM_INSTRUCTION = `
You are an expert Linux Tutor for a student taking the CSEG1126 Linux Lab course.
The syllabus includes:
1. Installation (VMware/VirtualBox)
2. Basic Commands (ls, cd, cp, mv, rm, nano, vim)
3. Permissions (chmod, chown) & File Ops (tar, grep, find)
4. Shell Scripting Basics (Variables, Math, Input)
5. Conditions (If/Else, Case) & Arrays
6. Loops (For, While, Until) & Functions
7. Process Management (ps, top, kill)
8. System Monitoring (df, free, uptime)
9. Advanced Scripting (File checks, String ops)
10. Expert System Logic (Rule-based scripts).

When asked, provide clear, concise, and academic-level explanations suitable for a university lab exam. 
If asked for code, provide valid BASH scripts.
If asked for MCQs, format them as JSON.
`;