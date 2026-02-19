document.addEventListener('DOMContentLoaded', () => {
    // Menangkap elemen DOM
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');
    const filterSelect = document.getElementById('filter-select');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    // Array untuk menyimpan data todo list
    let todos = [];

    // Fungsi untuk menampilkan (render) todos ke layar
    function renderTodos() {
        const filterValue = filterSelect.value;
        todoList.innerHTML = ''; // Bersihkan tabel sebelum render ulang

        // Logika Filter
        let filteredTodos = todos;
        if (filterValue === 'pending') {
            filteredTodos = todos.filter(todo => todo.status === 'pending');
        } else if (filterValue === 'completed') {
            filteredTodos = todos.filter(todo => todo.status === 'completed');
        }

        // Tampilan jika tidak ada data
        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <tr id="empty-state">
                    <td colspan="4" style="text-align: center; color: #94a3b8; padding: 30px 0;">No task found</td>
                </tr>
            `;
            return;
        }

        // Menambahkan baris tabel untuk setiap tugas
        filteredTodos.forEach((todo, index) => {
            const tr = document.createElement('tr');
            
            // Note: Klik pada badge status akan mengubah status task
            tr.innerHTML = `
                <td>${todo.task}</td>
                <td>${todo.dueDate}</td>
                <td>
                    <span class="status-badge ${todo.status === 'pending' ? 'status-pending' : 'status-completed'}" onclick="toggleStatus(${index})" title="Click to toggle status">
                        ${todo.status === 'pending' ? 'Pending' : 'Completed'}
                    </span>
                </td>
                <td>
                    <button class="delete-btn" onclick="deleteTodo(${index})">Delete</button>
                </td>
            `;
            todoList.appendChild(tr);
        });
    }

    // Fungsi Menambahkan Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah halaman refresh
        
        // Validasi input form (jika spasi kosong doang)
        const task = taskInput.value.trim();
        const dueDate = dateInput.value;

        if (task === '' || dueDate === '') {
            alert('Silakan isi tugas dan tanggal tenggat waktu!');
            return;
        }

        const newTodo = {
            task: task,
            dueDate: dueDate,
            status: 'pending' // Status default
        };

        todos.push(newTodo);
        taskInput.value = ''; // Kosongkan input setelah submit
        dateInput.value = '';
        renderTodos();
    });

    // Fungsi Menghapus 1 Task
    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        renderTodos();
    };

    // Fungsi Mengubah Status (Pending <-> Completed)
    window.toggleStatus = (index) => {
        todos[index].status = todos[index].status === 'pending' ? 'completed' : 'pending';
        renderTodos();
    };

    // Fungsi Hapus Semua (Delete All)
    deleteAllBtn.addEventListener('click', () => {
        if(todos.length > 0 && confirm('Apakah kamu yakin ingin menghapus semua tugas?')) {
            todos = [];
            renderTodos();
        }
    });

    // Menjalankan render saat filter diganti
    filterSelect.addEventListener('change', renderTodos);

    // Render awal saat halaman dimuat
    renderTodos();
});