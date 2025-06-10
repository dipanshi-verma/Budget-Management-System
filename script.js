window.onload = () => {
    renderData();
}

// Add income 
document.getElementById("incomeForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById('incomeTitle').value;
    const amount = parseFloat(document.getElementById('incomeAmount').value);
    if (!title || amount <= 0) {
        return alert("Please enter valid income details");
    }
    const income = { id: Date.now(), title, amount };
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    incomes.push(income);
    localStorage.setItem('incomes', JSON.stringify(incomes));
    this.reset();
    renderData();
});

// Add expense
document.getElementById("expenseForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById('expenseTitle').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    if (!title || amount <= 0) {
        return alert("Please enter valid expense details");
    }
    const expense = { id: Date.now(), title, amount };
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    this.reset();
    renderData();
});

function renderData() {
    const incomes = JSON.parse(localStorage.getItem('incomes')) || [];
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const incomelist = document.getElementById('incomelist');
    incomelist.innerHTML = '';
    let totalincome = 0;
    incomes.forEach(item => {
        totalincome += item.amount;
        const li = document.createElement('li');
        li.innerHTML = `${item.title}: ₹${parseFloat(item.amount).toLocaleString('en-IN')}
        <button onclick="deleteItem(${item.id},'incomes')">❌</button>`;
        incomelist.appendChild(li);
    });

    const expenselist = document.getElementById('expenselist');
    expenselist.innerHTML = '';
    let totalexpense = 0;
    expenses.forEach(item => {
        totalexpense += item.amount;
        const li = document.createElement('li');
        li.innerHTML = `${item.title}: ₹${parseFloat(item.amount).toLocaleString('en-IN')}
        <button onclick="deleteItem(${item.id},'expenses')">❌</button>`;
        expenselist.appendChild(li);
    });

    document.getElementById('totalIncome').innerText = `₹${totalincome.toLocaleString('en-IN')}`;
    document.getElementById('totalExpense').innerText = `₹${totalexpense.toLocaleString('en-IN')}`;
    document.getElementById('Balance').innerText = `₹${(totalincome - totalexpense).toLocaleString('en-IN')}`;
}

// Delete income/expense by ID
function deleteItem(id, type) {
    let data = JSON.parse(localStorage.getItem(type)) || [];
    data = data.filter(item => item.id !== id);
    localStorage.setItem(type, JSON.stringify(data));
    renderData();
}
