class classBasket {
    constructor(htmlObj, clickHandler) {
        this.items = [];
        this.htmlObj = htmlObj;
        this.htmlObj.addEventListener('click', clickHandler);
        this.viewStatus = 'short'
    };


    getItems() {
        return this.items
    };

    addItem(product, count) {
        let itemInBasket = this.checkInBasket(product);
        if (itemInBasket) {
            itemInBasket.count += +count;
        } else {
            let item = {
                product: product,
                count: count,
            };
            this.items.push(item);
        }
    };
    checkInBasket(product) {
        for (let item of this.items) {
            if (item.product.id == product.id) {
                return item
            };
        };
        return null;
    }
    renderShortView() {
        this.htmlObj.innerHTML = '';
        if (this.items.length < 1) {
            let p = document.createElement('p');
            p.className = 'errorMessage';
            p.textContent = 'Корзина пуста';
            this.htmlObj.appendChild(p);
        } else {
            let p = document.createElement('p');
            p.className = 'Message';
            let total = this.countBasketPrice();
            p.textContent = `В корзине: ${total.count} товаров на сумму ${total.sum} рублей`;
            this.htmlObj.appendChild(p);
        }
    };

    renderFullView() {
        let tableBasket = document.createElement('table');
        let titleRow = document.createElement('tr');
        titleRow.id = 'titleCatalog';
        let thd1 = document.createElement('th');
        thd1.textContent = '';
        let thd2 = document.createElement('th');
        thd2.textContent = 'Наименование';
        let thd3 = document.createElement('th');
        thd3.textContent = 'Кол-во';

        let thd4 = document.createElement('th');
        thd4.textContent = 'Цена';
        let thd5 = document.createElement('th');
        thd5.textContent = 'Валюта';

        titleRow.appendChild(thd1);
        titleRow.appendChild(thd2);
        titleRow.appendChild(thd3);
        titleRow.appendChild(thd4);
        titleRow.appendChild(thd5);
        tableBasket.appendChild(titleRow);
        let count = 0;
        for (let item of this.items) {
            let productRow = document.createElement('tr');
            productRow.id = 'rowProduct';
            let td1 = document.createElement('td');
            let cell0 = document.createElement('div');
            cell0.classList.add('thumbnail');
            cell0.setAttribute('product_id', item.product.id);
            let thumbnail = document.createElement('img');
            thumbnail.src = item.product.imgUrls[0];
            thumbnail.alt = 'product image';
            cell0.appendChild(thumbnail);
            td1.setAttribute('product_id', item.product.id);
            td1.appendChild(cell0);

            let td2 = document.createElement('td');
            td2.textContent = item.product.name;

            let td3 = document.createElement('td');
            td3.textContent = item.count;

            let td4 = document.createElement('td');
            td4.textContent = item.product.price;

            let td5 = document.createElement('td');
            td5.textContent = item.product.currency;

            productRow.appendChild(td1);
            productRow.appendChild(td2);
            productRow.appendChild(td3);
            productRow.appendChild(td4);
            productRow.appendChild(td5);
            tableBasket.appendChild(productRow);
        };
        let hrRow = document.createElement('tr');
        let hrTd = document.createElement('td');
        hrTd.colSpan = 5;
        hrTd.appendChild(document.createElement('hr'));
        hrRow.appendChild(hrTd);
        tableBasket.appendChild(hrRow);
        let total = this.countBasketPrice();

        let totalRow = document.createElement('tr');
        totalRow.id = 'totalBasket';
        let tothd1 = document.createElement('th');
        tothd1.textContent = '';
        let tothd2 = document.createElement('th');
        tothd2.textContent = 'Итого';
        let tothd3 = document.createElement('th');
        tothd3.textContent = total.count;

        let tothd4 = document.createElement('th');
        tothd4.textContent = total.sum;
        let tothd5 = document.createElement('th');
        tothd5.textContent = 'RUB';
        totalRow.appendChild(tothd1);
        totalRow.appendChild(tothd2);
        totalRow.appendChild(tothd3);
        totalRow.appendChild(tothd4);
        totalRow.appendChild(tothd5);
        tableBasket.appendChild(totalRow);

        this.htmlObj.appendChild(tableBasket);
    };

    updateView() {
        if (this.viewStatus == 'short') {
            this.renderShortView()
        } else {
            this.renderFullView()
        }
    };

    switchToFullView() {
        this.htmlObj = document.querySelector('.listBasket');
        this.viewStatus = 'full';
    };

    countBasketPrice() {
        let totalSum = 0;
        let totalItems = 0;
        for (let item of this.items) {
            totalSum += item.count * item.product.price;
            totalItems += item.count;
        };
        return { sum: totalSum, count: totalItems };
    };

    //очистка корзины
    clearBasket() {
        this.items = [];
        this.updateView();
    };

};