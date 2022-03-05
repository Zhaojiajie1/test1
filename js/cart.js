
//查看购物车（跳转到购物车）
toCart.addEventListener('click', function () {
    ajax({
        type: 'POST',
        url: 'http://180.76.185.37:3000/getCartData',
        data: {
            token: token,
        },
        async: true,
        success: function (res) {
            res = JSON.parse(res);
            console.log(res);
            //用户验证成功
            if (res.state == 1) {
                for (let ii = 0; ii < childBox.length; ii++) {
                    childBox[ii].classList.remove('show');
                }
                cart.className = cart.className + ' ' + 'show';
                //购物车页面
                let table = document.querySelector('table');
                //获取商品
                res.result.map(item => {

                    //创建一行
                    let tr = document.createElement('tr');
                    //插入到table内
                    table.appendChild(tr);
                    tr.setAttribute('gata-gid', item.id);
                    console.log(tr.getAttribute('gata-gid'));
                    //创建选择列
                    let tdOfCheck = document.createElement('td');
                    let checkboxInput = document.createElement('input');
                    checkboxInput.type = "checkbox";
                    checkboxInput.className = "checkbox";
                    tr.appendChild(tdOfCheck);
                    tdOfCheck.appendChild(checkboxInput);

                    //创建商品信息列（图片，名字，尺码）；
                    let td2 = document.createElement("td");
                    let img = document.createElement("img");
                    let goodsName = document.createElement("p");
                    goodsName.className = "goodsName";
                    let spanOfChinese = document.createElement("span");
                    let spanOfBrand = document.createElement("span");
                    spanOfBrand.className = "size";
                    tr.appendChild(td2);
                    td2.appendChild(img);
                    td2.appendChild(goodsName);
                    td2.appendChild(spanOfChinese);
                    spanOfChinese.innerText = "品牌:"
                    td2.appendChild(spanOfBrand);
                    img.className = "goodsimg";
                    img.src = item.imageUrl;
                    goodsName.innerText = item.name;
                    spanOfBrand.innerText = item.brand;

                    //创建单价列
                    let tdOfPrice = document.createElement("td");
                    let pOfPrice = document.createElement("p");
                    pOfPrice.className = 'goodsPrice';
                    tr.appendChild(tdOfPrice);
                    tdOfPrice.appendChild(pOfPrice);
                    pOfPrice.innerText = item.cost;

                    //创建增减按钮列
                    let tdOfBtn = document.createElement("td");
                    let deletebtn = document.createElement("button");
                    deletebtn.className = 'deletebtn';
                    deletebtn.innerText = '-';
                    let numberInput = document.createElement("input");
                    numberInput.type = "text";
                    numberInput.className = "number";
                    numberInput.value = '1';
                    let plus = document.createElement("button");
                    plus.className = "plusbtn";
                    plus.innerText = '+';

                    tr.appendChild(tdOfBtn);
                    tdOfBtn.appendChild(deletebtn);
                    tdOfBtn.appendChild(numberInput);
                    tdOfBtn.appendChild(plus);

                    //创建小计列               
                    let tdOfCount = document.createElement("td");
                    let pOfCount = document.createElement("p");
                    pOfCount.className = "count";
                    tr.appendChild(tdOfCount);
                    tdOfCount.appendChild(pOfCount);
                    //计算小计
                    pOfCount.innerText = numberInput.value * item.cost;

                    //创建删除列
                    let tdOfDelete = document.createElement("td");
                    let aOfDelete = document.createElement("a");
                    aOfDelete.href = 'javascript:void(0)';
                    aOfDelete.className = "delete";
                    tr.appendChild(tdOfDelete);
                    tdOfDelete.appendChild(aOfDelete);
                    aOfDelete.innerText = "删除";
                })
                //购物车操作

                //计算数量
                let number = document.getElementsByClassName("number");
                let plusbtn = document.getElementsByClassName("plusbtn");
                let minusbtn = document.getElementsByClassName("deletebtn");
                let count = document.getElementsByClassName("count");
                let index1 = 0;
                let ii = 0
                let sum = 0;
                let price = document.getElementsByClassName("goodsPrice");
                count[index1].innerText = number[index1].value * (price[index1]).innerText;


                //计算总数，总价
                let total = document.getElementsByClassName("total")[0];
                total.innerText = number.length;
                let totalMoney = document.getElementsByClassName('total-money')[0];
                totalMoney.innerText = 0;


                //选择操作
                let checkbox = document.getElementsByClassName("checkbox");
                for (ii = 0; ii < checkbox.length; ii++) {
                    checkbox[ii].index1 = ii;
                    checkbox[ii].onclick = function () {
                        //let index1 = this.parentNode.parentNode.getAttribute("data-gid");
                        console.log(this.index1);
                        if (checkbox[this.index1].checked) {
                            sum += parseInt(count[this.index1].innerText);
                        }
                        else {
                            sum -= parseInt(count[this.index1].innerText);
                        }
                        totalMoney.innerText = sum;

                    }
                }
                //增加操作
                for (ii = 0; ii < plusbtn.length; ii++) {
                    plusbtn[ii].index1 = ii;
                    plusbtn[ii].addEventListener("click", function () {
                        //index1 = this.parentNode.parentNode.getAttribute("data-gid");
                        console.log(this.index1);
                        number[this.index1].value++;
                        //计算小计
                        //price = price[index1].innerText;
                        count[this.index1].innerText = number[this.index1].value * price[this.index1].innerText;
                        if (checkbox[this.index1].checked) {
                            sum += parseInt(price[this.index1].innerText);
                            totalMoney.innerText = sum;
                        }

                    })
                }

                //减少操作
                for (ii = 0; ii < minusbtn.length; ii++) {
                    minusbtn[ii].index1 = ii;
                    minusbtn[ii].addEventListener("click", function () {
                        //index1 = this.parentNode.parentNode.getAttribute("data-gid");
                        console.log(this.index1);
                        if (number[this.index1].value == 1) {
                            if (checkbox[this.index1].checked) {
                                sum -= parseInt(price[this.index1].innerText);
                                console.log(sum);
                                totalMoney.innerText = sum;
                            }
                            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                            console.log(price[this.index1].innerText);
                        }
                        else {
                            number[this.index1].value--;

                            if (checkbox[this.index1].checked) {
                                console.log(sum);
                                sum -= parseInt(price[this.index1].innerText);
                                console.log(sum);
                                totalMoney.innerText = sum;
                            }
                        }
                        //计算小计
                        count[this.index1].innerText = number[this.index1].value * price[this.index1].innerText;


                    })


                }
                //删除操作
                let remove = document.getElementsByClassName("delete");
                for (let ii = 0; ii < remove.length; ii++) {
                    remove[ii].index1 = ii;
                    remove[ii].addEventListener("click", function () {
                        console.log(cartnumber.innerText);
                        console.log(total.innerText);
                        if (checkbox[this.index1].checked) {
                            sum = parseInt(totalMoney.innerText);
                            sum -= parseInt(count[this.index1].innerText);
                            totalMoney.innerText = sum; total.innerText--;
                        }
                        this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
                        let idx = this.parentNode.parentNode.getAttribute('gata-gid');
                        ajax({
                            type: "POST",
                            url: 'http://180.76.185.37:3000/deleteCartData',
                            data: {
                                token: token,
                                id: idx,
                            },
                            success: function (res) {
                                res = JSON.parse(res);
                                console.log(res);
                                alert(res.message);
                            }
                        })
                    })

                }
            }
        }
    })
})


