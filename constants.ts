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
    title: "Install virtual player and Linux",
    theory: "History of UNIX, The UNIX philosophy, GUI, Overview of the Linux OS, Unix commands, Introduction to VI editor.",
    labTasks: [
      "Install VMware Workstation 15 Player or VirtualBox.",
      "Download an installation .iso for a Linux distribution (Ubuntu/Fedora).",
      "Install the .iso from the virtual VBox or VMware Workstation.",
      "Complete VM setup (RAM, storage, user creation)."
    ]
  },
  {
    experiment: 2,
    title: "Practice some basic commands on Linux",
    theory: "File systems, permissions, ownership, text editors.",
    labTasks: [
      "Navigation: ls, cd, pwd, mkdir, rmdir.",
      "File Ops: touch, cp, mv, rm.",
      "Viewing/Editing: cat, less, more, head, tail, nano, vim."
    ]
  },
  {
    experiment: 3,
    title: "Files and Directories commands",
    theory: "File Manipulation, Compression, Archiving, Searching.",
    labTasks: [
      "Timestamps/Create: touch.",
      "Permissions: ls -l, chmod, chown, chgrp.",
      "Advanced: find, grep, tar, gzip/gunzip, ln (hard/soft links)."
    ]
  },
  {
    experiment: 4,
    title: "Shell Programming (Basics)",
    theory: "BASH scripting intro, variables, keywords, operators.",
    labTasks: [
      "Print 'Hello, World!'.",
      "Prompt user for name and greet.",
      "Arithmetic operations (add, sub, mul, div) on two inputs.",
      "Voting eligibility check (age input)."
    ]
  },
  {
    experiment: 5,
    title: "Shell Programming (Conditionals)",
    theory: "Command Line Args, Arrays, If-Else, Decision Making.",
    labTasks: [
      "Check if a number is Prime.",
      "Calculate sum of digits of a number.",
      "Check if a number is Armstrong."
    ]
  },
  {
    experiment: 6,
    title: "Shell Programming (Loops)",
    theory: "Loops, Loop control, IO Redirections, Functions.",
    labTasks: [
      "Check Palindrome number.",
      "Calculate GCD and LCM.",
      "Sort numbers in ascending/descending order."
    ]
  },
  {
    experiment: 7,
    title: "Shell Programming (Process)",
    theory: "Processes, Hierarchy, Management (kill, top), Scheduling.",
    labTasks: [
      "Check file existence; create if missing.",
      "Print 1-10 using loop.",
      "Count lines, words, chars in a file (file arg).",
      "Factorial function."
    ]
  },
  {
    experiment: 8,
    title: "Shell Programming (System Monitoring)",
    theory: "Signals, Resource Usage, Logging.",
    labTasks: [
      "Check file permissions (r/w/x).",
      "String operations (length, concat, compare).",
      "Search pattern in file (grep usage in script).",
      "System info: date, logged-in users, uptime."
    ]
  },
  {
    experiment: 9,
    title: "Shell Programming (File Management)",
    theory: "System Performance, Security.",
    labTasks: [
      "Rename files with prefix/suffix.",
      "Search files by criteria (ext/size).",
      "Fibonacci series (loop or recursion)."
    ]
  },
  {
    experiment: 10,
    title: "Shell Programming (Modular Code)",
    theory: "Reusable code, Optimization.",
    labTasks: [
      "Calculate string length.",
      "Reverse a string.",
      "Concatenate two strings."
    ]
  },
  {
    experiment: 11,
    title: "Shell Programming (Interaction)",
    theory: "Interactive scripts, Parsing Data.",
    labTasks: [
      "Split sentence into words.",
      "Check string Palindrome."
    ]
  },
  {
    experiment: 12,
    title: "Building a Rule-Based Expert System",
    theory: "Process Automation, Daemons.",
    labTasks: [
      "Create 'expert_system.sh'.",
      "Implement if-elif-else rules (e.g., medical symptoms).",
      "Prompt user, evaluate rules, give recommendation."
    ]
  }
];

// A sample of the 50 MCQs (expanded via AI later)
export const INITIAL_MCQS: Question[] = [
  { id: 1, question: "Which command is used to change the current directory?", options: ["ls", "pwd", "cd", "mkdir"], correctAnswer: 2, explanation: "'cd' stands for Change Directory." },
  { id: 2, question: "What does 'chmod 777 file' do?", options: ["Deletes the file", "Gives full permissions to everyone", "Hides the file", "Makes it read-only"], correctAnswer: 1, explanation: "7 (rwx) for owner, group, and others." },
  { id: 3, question: "Which symbol represents the pipe in Linux?", options: [">", ">>", "|", ";"], correctAnswer: 2, explanation: "The pipe '|' takes stdout of one command and passes it as stdin to another." },
  { id: 4, question: "Which command shows the current working directory?", options: ["whereis", "pwd", "cwd", "dir"], correctAnswer: 1, explanation: "'pwd' stands for Print Working Directory." },
  { id: 5, question: "Which editor is modal?", options: ["Nano", "Gedit", "Vim", "Notepad"], correctAnswer: 2, explanation: "Vim has different modes: Insert, Command, Visual." },
  { id: 6, question: "How do you run a shell script named 'script.sh'?", options: ["run script.sh", "./script.sh", "call script.sh", "exec script.sh"], correctAnswer: 1, explanation: "./ specifies the current directory. You may also need 'bash script.sh'." },
  { id: 7, question: "Which command is used to remove a directory that is NOT empty?", options: ["rmdir", "rm -r", "del", "erase"], correctAnswer: 1, explanation: "rmdir only removes empty directories. rm -r removes recursively." },
  { id: 8, question: "What is the PID of the init/systemd process usually?", options: ["0", "1", "100", "999"], correctAnswer: 1, explanation: "Init is the parent of all processes and typically has PID 1." },
  { id: 9, question: "In a shell script, how do you access the first argument?", options: ["$0", "$1", "$arg1", "#1"], correctAnswer: 1, explanation: "$0 is the script name, $1 is the first argument." },
  { id: 10, question: "Which grep argument makes the search case-insensitive?", options: ["-i", "-c", "-v", "-r"], correctAnswer: 0, explanation: "-i stands for ignore-case." },
  { id: 11, question: "What does 'touch' primarily do?", options: ["Opens a file", "Changes file timestamps/creates empty file", "Deletes a file", "Moves a file"], correctAnswer: 1, explanation: "Primary use is updating timestamps; side effect is creating empty file if not exists." },
  { id: 12, question: "Which loop is best for iterating over a list of items?", options: ["while", "until", "for", "do-while"], correctAnswer: 2, explanation: "For loops are designed to iterate over lists/arrays." },
  { id: 13, question: "What is the outcome of 'echo $$'?", options: ["Prints current user", "Prints Process ID of current shell", "Prints last command status", "Prints nothing"], correctAnswer: 1, explanation: "$$ is a special variable holding the current Shell PID." },
  { id: 14, question: "Which command displays the first 10 lines of a file?", options: ["tail", "top", "head", "start"], correctAnswer: 2, explanation: "head defaults to 10 lines." },
  { id: 15, question: "How do you define a function in bash?", options: ["func name() {}", "name() {}", "function name {}", "Both B and C"], correctAnswer: 3, explanation: "Both 'name() {}' and 'function name {}' are valid syntax." },
];

// A sample of the 50 Viva Questions (expanded via AI later)
export const INITIAL_VIVA: VivaQuestion[] = [
  { id: 1, question: "What is the Linux Kernel?", answer: "The core interface between a computer's hardware and its processes. It communicates between the 2, managing resources as efficiently as possible.", category: "Basic" },
  { id: 2, question: "Explain the difference between soft link and hard link.", answer: "A hard link is a direct reference to the inode (physical data). If original is deleted, hard link still works. A soft link is a shortcut (path). If original is deleted, soft link breaks.", category: "Intermediate" },
  { id: 3, question: "What are the three standard streams in Linux?", answer: "stdin (0), stdout (1), and stderr (2).", category: "Basic" },
  { id: 4, question: "How do you check memory usage in Linux?", answer: "Using commands like 'free -h', 'top', 'htop', or reading '/proc/meminfo'.", category: "Basic" },
  { id: 5, question: "What is a shebang (#!)?", answer: "It is the first line in a script (e.g., #!/bin/bash) that tells the kernel which interpreter to use to execute the file.", category: "Intermediate" },
  { id: 6, question: "Explain the 'grep' command.", answer: "Global Regular Expression Print. It searches files for lines matching a specific pattern.", category: "Basic" },
  { id: 7, question: "What is the difference between relative and absolute path?", answer: "Absolute path starts from root (/) e.g., /home/user/file. Relative path starts from current directory e.g., ./file.", category: "Basic" },
  { id: 8, question: "How do you run a process in the background?", answer: "Append an ampersand (&) to the end of the command.", category: "Intermediate" },
  { id: 9, question: "What is the purpose of 'sudo'?", answer: "SuperUser DO. It allows a permitted user to execute a command as the superuser or another user.", category: "Basic" },
  { id: 10, question: "Explain the permissions 'drwxr-xr-x'.", answer: "d=directory. Owner has read/write/execute. Group has read/execute. Others have read/execute.", category: "Intermediate" },
  { id: 11, question: "What is a daemon?", answer: "A background process that runs without direct user interaction, often managing services (like httpd, sshd).", category: "Advanced" },
  { id: 12, question: "How do you create a variable in Bash?", answer: "name=value (No spaces around =). Access it using $name.", category: "Basic" },
  { id: 13, question: "What is the difference between 'wait' and 'sleep'?", answer: "'sleep' pauses for a specific time. 'wait' pauses until a background process finishes.", category: "Advanced" },
  { id: 14, question: "What is a Zombie process?", answer: "A process that has completed execution but still has an entry in the process table because its parent hasn't read its exit status.", category: "Advanced" },
  { id: 15, question: "How do you make a shell script executable?", answer: "Using 'chmod +x scriptname.sh'.", category: "Basic" },
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