        const inputField = document.getElementById("inputed_tasks");
        const addBtn = document.getElementById("Add_btn");
        const taskContainer = document.getElementById("adding_asks");

        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        function saveTasks(){
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function createTaskElement(task, index){
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-item';
            taskDiv.dataset.index = index;

            const left = document.createElement('div');
            left.className = 'task-left';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = !!task.done;
            const p = document.createElement('p');
            p.textContent = task.text;
            if(task.done){ p.style.textDecoration = 'line-through'; p.style.color = 'gray'; }
            left.appendChild(checkbox);
            left.appendChild(p);

            const right = document.createElement('div');
            right.className = 'task-right';
            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'delete-btn';
            delBtn.textContent = 'Delete';
            right.appendChild(delBtn);

            taskDiv.appendChild(left);
            taskDiv.appendChild(right);
            return taskDiv;
        }

        function renderTasks(){
            taskContainer.innerHTML = '';
            tasks.forEach((t, i) => taskContainer.appendChild(createTaskElement(t, i)));
        }

        function addTask(){
            const text = inputField.value.trim();
            if(!text) return;
            tasks.push({ text, done: false });
            saveTasks();
            renderTasks();
            inputField.value = '';
            inputField.focus();
        }

        addBtn.addEventListener('click', addTask);
        inputField.addEventListener('keypress', (e) => { if(e.key === 'Enter') addTask(); });

        // Event delegation for delete and checkbox changes
        taskContainer.addEventListener('click', (e) => {
            if(e.target.matches('.delete-btn')){
                const idx = Number(e.target.closest('.task-item').dataset.index);
                tasks.splice(idx, 1);
                saveTasks();
                renderTasks();
            }
        });

        taskContainer.addEventListener('change', (e) => {
            if(e.target.type === 'checkbox'){
                const idx = Number(e.target.closest('.task-item').dataset.index);
                tasks[idx].done = e.target.checked;
                saveTasks();
                renderTasks();
            }
        });

        // initial render
        renderTasks();