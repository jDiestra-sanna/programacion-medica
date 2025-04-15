
 var pedrito ;
 var recojos , estados,estadosoriginal,estadosoriginal012;
 var fecha;
 var date = new Date();

 var dias ;
var gcache,gstartcoord;
 
 recojos = new Array(49);
   
 for (var i = 1; i < recojos.length; i++) {
  recojos[i] = new Array(31);
 }


(function ($) {
  
  'use strict';
var direction = "",    oldx = 0;
   pedrito='3';
  var serialize = function (data, accuracy) {
    accuracy = accuracy > 0 ? accuracy : 1;
    var chunkSize = 48 * accuracy;
    var res = [];
    var i = 0;
    for (i = 0; i < chunkSize * 7; i++) {
      res[i] = 0;
    }
    for (i = 0; i < 7; i++) {
      var row = data[i + 1];
      if (!row) {continue;}
      for (var j = 0, rowLen = row.length; j < rowLen; j++) {
        res[i * chunkSize + row[j]] = 1;
      }
    }

    return res.join('');
  };

  var parse = function (strSequence, accuracy) {
    accuracy = accuracy > 0 ? accuracy : 1;
    var chunkSize = 48 * accuracy;
    var res = {};
    for (var i = 0, row = 1, len = strSequence.length; i < len; i++) {
      var col = i % chunkSize;
      if (strSequence[i] === '1') {
        !res[row] && (res[row] = []);
        res[row].push(col);
      }
      if ((i + 1) % chunkSize === 0) {
        row++;
      }
    }

    return res;
  };

  var toStr = function (currentSelectRange) {
    return Object.prototype.toString.call(currentSelectRange);
  };
  // it only does '%s', and return '' when arguments are undefined
  var sprintf = function (str) {
    var args = arguments;
    var flag = true;
    var i = 1;

    str = str.replace(/%s/g, function () {
      var arg = args[i++];

      if (typeof arg === 'undefined') {
        flag = false;
        return '';
      }
      return arg;
    });
    return flag ? str : '';
  };

  /**
   * Return an interger array of ascending range form 'form' to 'to'.
   * @param {Number} form
   * @param {Number} to
   * @return {Array}
   */
  var makeRange = function (from, to) {
    // 保证 from <= to
    if (from > to) {
      from = from + to;
      to = from - to;
      from = from - to;
    }

    var res = [];
    for (var i = from; i <= to; i++) {
      res.push(i);
    }
    return res;
  };

  

  var makeMatrix = function (startCoord, endCoord) {
    var matrix = {};
    var colArr = makeRange(startCoord[1], endCoord[1]);
    var fromRow = startCoord[0] < endCoord[0] ? startCoord[0] : endCoord[0];
    var steps = Math.abs(startCoord[0] - endCoord[0]) + 1;
    for (var i = 0; i < steps; i++) {
      matrix[fromRow + i] = colArr.slice(0);
    }
    return matrix;
  };
  var makeMatrixup = function (startCoord, endCoord,e) {
    var matrix = {};
    var fromRow = startCoord[0] < endCoord[0] ? startCoord[0] : endCoord[0];
    var steps = Math.abs(startCoord[0] - endCoord[0]) + 1;
    var  num;
    var tamaño = (e.target.getAttribute("data-row"))*1;
     
    var x =(gcache[ gstartcoord[0]]) ;
   
    if (x && x.length !=0){
           

          x = x.slice(0,x.lastIndexOf(tamaño)+1);
           if (x.length==0){
          }else{
            
                  for(var i = 0;i<x.length-1;i++){
                    if(!x.includes(x[i]-1) && !x.includes(x[i]+1) && (x[i+1]==x[x.length-1]) ){
                        num = x[i];
                    }
                  }
                  if(num){
                    if(!x.includes(x[x.length-1]-1) && !x.includes(x[x.length-1]+1)){
                      startCoord[1] = num;
                    }
                  }
          }
    }
    var colArr = makeRange(startCoord[1], endCoord[1]);
    for (var i = 0; i < steps; i++) {
      matrix[fromRow + i] = colArr.slice(0);
    }
    
    return matrix;
  };
 

  /**
   * Merge to arrays, return an new array.
   * @param {Array} origin
   * @param {Array} addition
   */
  var mergeArray = function (origin, addition) {
    
    var hash = {};
    var res = [];
 
    origin.forEach(function (item, i) {
      hash[item] = 1;
      res[i] = item;
    });

    addition.forEach(function (item) {
      if (!hash[item]) {
        res.push(item);
      }
    });

    return res.sort(function (num1, num2) {
      return num1 - num2;
    });
  };

  /**
   * 去当前数组中去除指定集合，返回新数组
   * @param {Array} origin 原数组
   * @param {Array} reject 要去除的数组
  */
  var rejectArray = function (origin, reject) {

    var hash = {};
    var res = [];

    reject.forEach(function (item, i) {
      hash[item] = i;
    });

    origin.forEach(function (item) {
      if (!hash.hasOwnProperty(item)) {
        res.push(item);
      }
    });

    return res.sort(function (num1, num2) {
      return num1 - num2;
    });
  };

  // 选择模式
  var SelectMode = {
    JOIN: 1, // 合并模式，添加到选区
    MINUS: 2, // 减去模式，从之前的选区中减去
    REPLACE: 3, // 替换模式，弃用之前的选区，直接使用给定的选区作为最终值
    NONE: 0
  };

  var Scheduler = function (el, options) {
   
    this.$el = $(el);
    if (!this.$el.is('table')) {
      this.$el = $('<table></table>').appendTo(this.$el);
    }

    // 自定义项
    this.options = options;
    estados = {...options.data};
    estadosoriginal012 = {...options.data};

    estadosoriginal = {...options.data};
    fecha = {...options.data};
    console.dir(el);
    // 选择模式
    this.selectMode = SelectMode.NONE;
    this.startCoord = null;
    this.endCoord = null;
    // 控件的数据对象，所有操作不会更改 this.options.datas
    for (const property in this.options.data) {
      estadosoriginal[property] = estadosoriginal[property].map(function (x) {    return parseInt(x.substr(1));    })    ;
      estadosoriginal012[property] = estadosoriginal012[property].map(function (x) {    return parseInt(x.substr(0,1));    })    ;
      estados[property] = estados[property].map(function (x) {    return parseInt(x.substr(0,1));    })    ;
      fecha[property] = fecha[property].map(function (x) {    return x.substr(0,10);    })    ;

      this.options.data[property] = this.options.data[property].map(function (x) {    return parseInt(x.substr(1));    })    ;
      
    }
    this.data = $.extend(true, {}, this.options.data);
    console.log(estados);
    console.log(this.options.data);

    this.init();
  };

  // 默认项
  Scheduler.DEFAULTS = {
    locale: 'en', // i18n
    accuracy: 1, // how many cells of an hour
    data: [], // selected cells
    footer: true,
    multiple: true,
    disabled: false,
    // event callbacks
    onDragStart: $.noop,
    onDragMove: $.noop,
    onDragEnd: $.noop,
    onSelect: $.noop,
    onRender: $.noop
  };

  // Language
  Scheduler.LOCALES = {};

  // Simplified Chinese
  Scheduler.LOCALES['zh-cn'] = Scheduler.LOCALES.zh = {
    AM: '上午',
    PM: '下午',
    NO: 'NOCHE',
    TIME_TITLE: '时间',
    WEEK_TITLE: '星期',
    WEEK_DAYS: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
    DRAG_TIP: '可拖动鼠标选择时间段',
    RESET: '清空选择'
  };

  // English
 

var month = date.getMonth()+1;

date.setDate(1);
var all_days  =[],all_horas  =[];
var obj;

while (date.getMonth()+1 == month) {
  
obj =  date.getFullYear() + '&#8209;' + (date.getMonth()+1).toString().padStart(2, '0') + '&#8209;' + date.getDate().toString().padStart(2, '0') ;
 all_days.push(obj);
    date.setDate(date.getDate() + 1);
}
//  all_days = JSON.parse('[' + all_days.substr(  0  , all_days.length - 1 ) + ']');

//all_days ='[' + all_days.substr(  0  , all_days.length - 1 ) +  ']'; 
    for (var i = 6; i < 24; i+=0.5) {
    all_horas.push(((i% 1 === 0)? i+':00':Math.floor(i)+':30')+ '&#8209;' + (((i+0.5)% 1 === 0)? (i+0.5)+':00':Math.floor((i+0.5))+':30')); // hour text
    }
    for (var j = 0; j < 6; j+=0.5) {
    all_horas.push(((j% 1 === 0)? j+':00':Math.floor(j)+':30')+ '&#8209;' + (((j+0.5)% 1 === 0)? (j+0.5)+':00':Math.floor((j+0.5))+':30')); // hour text
    }
  Scheduler.LOCALES['en-US'] = Scheduler.LOCALES.en = {
    AM: 'MADRUGADA',
    PM: 'TARDE',
    NO: 'NOCHE',
    TIME_TITLE: 'DIAS', 
    WEEK_TITLE: 'HORA',
    WEEK_DAYS:  all_horas ,
    DRAG_TIP: 'Drag to select hours',
    RESET: 'Reset Selected'
  };

  // Template
  Scheduler.TEMPLATES = {
    HALF_DAY_ROW:  
      '<tr><th rowspan="2" class="slash">' +
      '<div class="scheduler-time-title">%s</div>' +

      '<div class="scheduler-week-title">%s<br><span style="font-size:0.7vw;color:red;font-weight:800;">INI - FIN</span></div>' +
      '</th>'  ,
    HOUR_HEAD_CELL: '<th class="scheduler-hour-toggle" data-hour-toggle="%s" colspan="%s">%s</th>',
    DAY_ROW: '<tr data-index="%s"><td class="scheduler-day-toggle" data-day-toggle="%s">%s</td>%s</tr>',
    HOUR_CELL: '<td class="scheduler-hour%s" data-row="%s" data-col="%s" data-grupo="%s"></td>',
    FOOT_ROW: '<tr><td colspan="%s"><span class="scheduler-tips">%s</span></td></tr>'
  };

  // Util
  Scheduler.Util = {
    parse: parse,
    serialize: serialize
  };

  var proto = Scheduler.prototype;

  proto.init = function () {

    this.initLocale();
    this.initTable();
    this.options.onRender.call(this.$el);
  };

  proto.initLocale = function () {
    var me = this;
    if (me.options.locale) {
      var parts = me.options.locale.toLowerCase().split(/-|_/);
      if (parts[1]) {
        parts[1] = parts[1].toUpperCase();
      }
      if ($.fn.scheduler.locales[me.options.locale]) {
        // locale as requested
        $.extend(me.options, $.fn.scheduler.locales[me.options.locale]);
      } else if ($.fn.scheduler.locales[parts.join('-')]) {
        // locale with sep set to - (in case original was specified with _)
        $.extend(me.options, $.fn.scheduler.locales[parts.join('-')]);
      } else if ($.fn.scheduler.locales[parts[0]]) {
        // short locale language code (i.e. 'en')
        $.extend(me.options, $.fn.scheduler.locales[parts[0]]);
      }
    }
  };

  proto.initTable = function () {
    
    this.$el.addClass('scheduler');
    if (this.options.disabled) {
      this.$el.addClass('scheduler-disabled');
    }
    this.initHead();
    
    this.initBody();
    if (this.options.footer) {
      this.initFoot();
    }
  };

  proto.initHead = function () {
    var me = this;
    me.$head = me.$el.find('>thead');
    
    if (!me.$head.length) {

      me.$head = $('<thead></thead>').appendTo(me.$el);
      
    }
    me.$head.append(me.getHeadHtml());

    // toggle select half day
    
       me.$head.on('mousedown', '.scheduler-hour-toggle', me.onMouseDown.bind(me))
      .on('mousemove', '.scheduler-hour-toggle', me.onMouseMove.bind(me))
      .on('mouseup', '.scheduler-hour-toggle', me.onMouseUp.bind(me));
    // toggle select an hour
    //me.$head.on('click', '.scheduler-hour-toggle', me.onToggleHour.bind(me));
  };

  proto.initBody = function () {
    var me = this;
    
    me.$body = me.$el.find('>tbody');
    if (!me.$body.length) {
      me.$body = $('<tbody></tbody>').appendTo(me.$el);
    }
    me.$body.append(me.getBodyHtml(me.options.data));

    // toggle select day
    //me.$body.on('click', '.scheduler-day-toggle', me.onToggleDay.bind(me));
    // range toggle select hour
        me.$body.on('mousedown', '.scheduler-day-toggle', me.onMouseDown.bind(me))
      .on('mousemove', '.scheduler-day-toggle', me.onMouseMove.bind(me))
      .on('mouseup', '.scheduler-day-toggle', me.onMouseUp.bind(me));
    me.$body.on('mousedown', '.scheduler-hour', me.onMouseDown.bind(me))
      .on('mousemove', '.scheduler-hour', me.onMouseMove.bind(me))
      .on('mouseup', '.scheduler-hour', me.onMouseUp.bind(me));
  };

  proto.initFoot = function () {
    var me = this;
    me.$foot = me.$el.find('>tfoot');
    if (!me.$foot.length) {
      me.$foot = $('<tfoot></tfoot>').appendTo(me.$el);
    }
    me.$foot.append(me.getFootHtml());
    me.$foot.on('click', '.scheduler-reset', me.onReset.bind(me));
  };

  proto.getHeadHtml = function (data) {
    var me = this;
    var options = me.options;
    var cabecera = (sprintf($.fn.scheduler.templates.HALF_DAY_ROW,
                            options.TIME_TITLE, // title: time
                            options.WEEK_TITLE, // title: week
                            me.options.accuracy * 12, // row span
                            options.AM, // title: 上午
                            me.options.accuracy * 6, // row span
                            options.PM, // title: 下午
                            me.options.accuracy * 6, // row span
                            options.NO // title: 下午

                           ));
 
    var hours = '';
   
    for (var i = 1; i <= getDaysInMonth(date.getMonth()+1, date.getFullYear()); i++) {
      var oneday = (new Date(date.getFullYear()+'/'+(date.getMonth()+1)+'/'+i).toLocaleString('es-PE', {  weekday: 'short' })).toUpperCase();
      hours += sprintf($.fn.scheduler.templates.HOUR_HEAD_CELL,
                       i, // hour indexs
                       1,//options.accuracy, // row span
                       i+'<br>'+oneday // hour text
                      );
    }
 
    return cabecera + sprintf('%s</tr>', hours);
  };

  proto.getFootHtml = function () {
    var me = this;
    var options = me.options;
    return sprintf(
      $.fn.scheduler.templates.FOOT_ROW,
      options.accuracy * 24 + 1,
      //options.DRAG_TIP,
     // options.RESET
    );
  };


var getDaysInMonth = function(month,year) {
  // Here January is 1 based
  //Day 0 is the last day in the previous month
 
 return new Date(year, month, 0).getDate();
// Here January is 0 based
// return new Date(year, month+1, 0).getDate();
};//revisar papu
  proto.getBodyHtml = function (data) {
     
    var me = this;
    var options = me.options;
    var rows = '';
    var dias=  getDaysInMonth(date.getMonth()+1, date.getFullYear());
    
 

    var cellOfRow = options.accuracy * dias;
    var bordelado= '',grupo='',active ='';
    var horainicio =[];
    var  flag =true;

/*
    //Valida tenga turnos de años pasados
    fetch(`/programacion/validar_anios`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
     
      })
    }).then(response => {
      if (response.ok) {
        //alert("correcto");
      }else{
        //alert("error");
      }
      
    }) */

    for (var i = 1; i <= 48; i++) {
      var cells = '';
      for (var j = 1; j <= cellOfRow; j++) {
          var selectedHours = data[j];
          var estado = estados[j];
          cells += sprintf(
          $.fn.scheduler.templates.HOUR_CELL,
          selectedHours && ~selectedHours.indexOf(i)    ?( estado && ~estado[selectedHours.indexOf(i)]&&(estado[selectedHours.indexOf(i)]==1 ||  estado[selectedHours.indexOf(i)]==2)? ' scheduler-active-disabled': ' scheduler-active' ): '',
          i,
          j,
          grupo,
          //selectedHours && recojos[i][j-1]  && ~selectedHours.indexOf(i)?(bordelado == ' scheduler-activetop'?recojos[i][j-1]:''):''
        );
      }

      rows += sprintf(
        $.fn.scheduler.templates.DAY_ROW,
        i,
        i,
        options.WEEK_DAYS[i - 1],
        cells
      );
    }
    //alert(estado);

    return rows;
  };
 
 
 
 

 proto.onMouseDown = function (e) {
      if ( e.which==2){return;};
  
    if (this.options.disabled) {
      return;
    }

    this.moving = true;
    var $cell = $(e.target);
  
 
     
    if ( e.which==3){     
       return false;
    }
    
    this.startCoord = [$cell.data('col'),$cell.data('row')];
    gstartcoord =  this.startCoord ;
     this.endCoord = this.startCoord.slice(0);
     this.selectMode = this.getCellSelectMode(this.startCoord);
  

    this.updateRange(this.startCoord, this.endCoord, this.selectMode);
    this.options.onDragStart.call(this.$el, this.cache);
    
  };

  


 proto.onMouseMove = function (e) {
    var $cell = $(e.target);
     var row = $cell.data('col');
  var col = $cell.data('row');
   var columnas = document.querySelectorAll(".scheduler-hour-toggle");
   var index = 0, length = columnas.length;
  for ( ; index < length; index++) {
    columnas[index].style.background = "#8fed8f";
     }
     var filas = document.querySelectorAll(".scheduler-day-toggle");
     var index = 0, length = filas.length;
    for ( ; index < length; index++) {
      filas[index].style.background = "#8fed8f";
       }
       if (col){
        document.querySelector('[data-day-toggle="'+col+'"]').style.background  = "yellow";
    
       }
   if (row){
    document.querySelector('[data-hour-toggle="'+row+'"]').style.background  = "yellow";

   }
  
 
    if (!this.moving) {
      return false;
    }
    
     if (!row)  {
      this.moving = false;
      this.updateRange(0,0, 0);
      return false;
    }
    
    if (!this.selectMode || !this.startCoord || (this.endCoord &&
                                                 this.endCoord[0] === row &&
                                                 this.endCoord[1] === col)
       ) {
          
      return false;
    }
    if (this.endCoord[0] != row){
      return false;

    }

    this.endCoord = [$cell.data('col'), $cell.data('row')];
    
  
    this.updateRange(this.startCoord, this.endCoord, this.selectMode);
    this.options.onDragMove.call(this.$el, this.cache);

  };

  proto.onMouseUp = function (e) {
    if ( e.which==2 || e.which==3){return;};
    if (!this.moving) {
      return false;
    }
    var x;
    // 起始点都在同一个位置
    var $cell = $(e.target);

    this.endCoord = [$cell.data('col'), $cell.data('row')];
    if (this.startCoord[0] === this.endCoord[0] &&   this.startCoord[1] === this.endCoord[1] && this.selectMode == SelectMode.JOIN) {
     
      x =  gcache[ this.startCoord[0]] ;
      if(x.length >1){
         
           //if(!x.includes( (x[x.lastIndexOf(this.endCoord[1]) +1] === undefined) ?this.endCoord[1]: x[x.lastIndexOf(this.endCoord[1]) +1]  +1  )   ){
          if(         x[x.lastIndexOf(this.endCoord[1]) +1]  &&   !x.includes(  x[x.lastIndexOf(this.endCoord[1]) +1]  +1)   && (x.slice(0,x.lastIndexOf(this.endCoord[1]))).length !=1 )  {
             // if (      x[x.lastIndexOf(this.endCoord[1]) - 1]  &&  !x.includes(  x[x.lastIndexOf(this.endCoord[1]) -1]  -1)     ){
                this.startCoord[1] =  this.endCoord[1];
                this.endCoord[1]   =  x[x.lastIndexOf(this.endCoord[1]) + 1] ;
                 
          //    }
          }
      }  
        this.updateRangeup( this.startCoord ,  this.endCoord , this.selectMode,e);
         
		    var filas = document.querySelectorAll(".scheduler-day-toggle");
        var index = 0, length = filas.length;
       for ( ; index < length; index++) {
         filas[index].style.background = "#8fed8f";
          }
   
      if ($cell.data('row')){
       document.querySelector('[data-day-toggle="'+$cell.data('row')+'"]').style.background  = "yellow";
   
      }
    }
  
     this.options.onDragEnd.call(this.$el, this.cache);
    this.end();

  };

 

  /**
   * 根据当前的选中坐标系更新视图，并更新选中数据
   * @param {Array} startCoord 起始坐标 [row, col]
   * @param {Array} endCoord 终结坐标 [row, col]
   * @param {SelectMode} selectMode 选择模式
   */
  proto.updateToggle = function (startCoord, endCoord, selectMode) {
    this.updateRange(startCoord, endCoord, selectMode);
    this.end();
  };

  /**
   * 根据当前的选中坐标系更新视图
   * @param {Array} startCoord 起始坐标 [row, col]
   * @param {Array} endCoord 终结坐标 [row, col]
   * @param {SelectMode} selectMode 选择模式
   */
  proto.updateRange = function (startCoord, endCoord, selectMode) {
    var nuevo = [];

    var currentSelectRange = makeMatrix(startCoord, endCoord);

    this.cache = this.merge(this.data, currentSelectRange, selectMode);
   
   gcache = this.cache;
   for (x in this.cache) {
    if(estadosoriginal.hasOwnProperty(x)){
      
      for (i=0;i<this.cache[x].length;i++){
         
        if(  estadosoriginal[x].indexOf(this.cache[x][i])>=0 && (estadosoriginal012[x][estadosoriginal[x].indexOf(this.cache[x][i])] == 1  || estadosoriginal012[x][estadosoriginal[x].indexOf(this.cache[x][i])] == 2 ) ) {
          
          nuevo[i] = estadosoriginal012[x][estadosoriginal[x].indexOf(this.cache[x][i])];
        }
        else {
          nuevo[i] = 0;
        }

      }
      estados[x] = nuevo ;
      nuevo = [];
    }else{
      estados[x] =(this.cache[x]).map(function (x) {    return  0;    })  ;
    }

}
this.update(this.cache);
  };
   
  proto.updateRangeup = function (startCoord, endCoord, selectMode,e) {
    var nuevo = [];
    var currentSelectRange = makeMatrixup(startCoord, endCoord,e);
   
    this.cache = this.merge(this.data, currentSelectRange, selectMode);
    
  
    for (x in this.cache) {
      if(estadosoriginal.hasOwnProperty(x)){
        
        for (i=0;i<this.cache[x].length;i++){
           
          if(  estadosoriginal[x].indexOf(this.cache[x][i])>=0 && (estadosoriginal012[x][estadosoriginal[x].indexOf(this.cache[x][i])] == 1  || estadosoriginal012[x][estadosoriginal[x].indexOf(this.cache[x][i])] == 2 ) ) {
            
            nuevo[i] = estadosoriginal012[x][estadosoriginal[x].indexOf(this.cache[x][i])];
          }
          else {
            nuevo[i] = 0;
          }

        }
        estados[x] = nuevo ;
        nuevo = [];
      }else{
        estados[x] =(this.cache[x]).map(function (x) {    return  0;    })  ;
      }
 
  }
  this.update(this.cache);
  };
  /**
   * 更新视图
   * @param {Object} data 选中的时间集合
   */
  proto.update = function (data) {
    this.$body.html(this.getBodyHtml(data));
  };

  // 并更新选中数据
  proto.end = function () {
    this.data = this.cache;
    this.cache = null;
    this.moving = false;
    this.startCoord = null;
    this.endCoord = null;
    this.selectMode = SelectMode.NONE;
    this.options.onSelect.call(this.$el, this.val());
  };

  proto.onReset = function () {
    if (this.options.disabled) {
      return;
    }
    this.val({});
    this.options.onSelect.call(this.$el, this.val());
  };

  /**
   * 根据选择模式合并合个集合
   * @param {Object} origin 上一次选中的数据
   * @param {Object} current 当前选中的数据
   * @param {Number} selectMode 选择模式 {0: none, 1: 选择（合并）模式, 2: 排除模式（从选区中减去）}
   */
  proto.merge = function (origin, current, selectMode) {
     var res = {};
    
     dias=  getDaysInMonth(date.getMonth()+1, date.getFullYear());
    // 替换模式下，弃用之前的选区，直接使用当前选区
    if (selectMode === SelectMode.REPLACE) {
      for (var i = 1; i <=  dias; i++) {
        if (current[i] && current[i].length) {
          res[i] = current[i].slice(0);
        }
      }
      return res;
    }    
      for (var i = 1; i <= dias; i++) {
          if (!current[i]) {
                if (origin[i] && origin[i].length) {
                
                  res[i] = origin[i].slice(0);
                }
                continue;
          }
          if (origin[i] && origin[i].length) {
            
             var m = selectMode === SelectMode.JOIN ? mergeArray(origin[i], current[i]) : rejectArray(origin[i], current[i]); 
            
              m.length && (res[i] = m);
          } else if (selectMode === SelectMode.JOIN) {
            res[i] = current[i].slice(0);
          }
      }
    return res;
  };

  /**
   * 根据当前选中的范围内时间格式的空闲情况，决定是全选还是全不选
   * 全空闲：总时间格目 === 空闲时间格数目
   * 部分空闲：总时间格目 !== 空闲时间格数目
   * 无空闲：空闲时间格数目 === 0
   * 状态切换：
   * 当前范围全空闲 > 采用合并模式，全选当前范围
   * 部分空闲 > 采用合并模式，全选当前范围
   * 无空闲 > 采用合并模式，全不选当前范围
   *
   * @param {Array} startCoord 起始坐标 [row, col]
   * @param {Array} endCoord 终结坐标 [row, col]
   * @return {SelectMode}
   */
  proto.getRangeSelectMode = function (startCoord, endCoord) {
    if (!this.options.multiple) {
      return SelectMode.REPLACE;
    }
    var rowRange = this.sortCoord(startCoord[0], endCoord[0]);
    var colRange = this.sortCoord(startCoord[1], endCoord[1]);
    var startRow = rowRange[0];
    var endRow = rowRange[1];
    var startCol = colRange[0];
    var endCol = colRange[1];
    var rows = endRow - startRow + 1;
    var cols = endCol - startCol + 1;
    var total = rows * cols;

    // 计算已使用的时间格子
    // TODO 未过滤 disabled 的格子
    var used = 0;
    for (var i = 0; i < rows; i++) {
      var day = startRow + i;
      var data = this.data[day];
      if (!data) {
        continue;
      }
      for (var j = 0; j < data.length; j++) {
        if (data[j] >= startCol && data[j] <= endCol) {
          used++;
        }
      }
    }

    return total === used ? SelectMode.MINUS : SelectMode.JOIN;
  };

  /**
   * 根据当前选中的时间格式的空闲情况，决定是全选还是全不选
   * 状态切换：
   * 当前为单选模式(multiple=false)，-> 替换模式
   * 当前选中时间段为空闲 -> 全选不
   * 当前选中时间段为无空闲 - > 全不选
   *
   * @param {Array} startCoord 起始坐标 [row, col]
   * @return {SelectMode}
   */
  proto.getCellSelectMode = function (coord) {
    if (!this.options.multiple) {
      return SelectMode.REPLACE;
    }
    // TODO 未过滤 disabled 的格子
    var day = this.data[coord[0]];
 
    return day && ~day.indexOf(coord[1]) ? SelectMode.MINUS : SelectMode.JOIN;
  };

  proto.sortCoord = function (num1, num2) {
    if (num1 > num2) {
      return [num2, num1];
    }
    return [num1, num2];
  };

  proto.disable = function () {
    this.$el.toggleClass('scheduler-disabled', true);
    this.options.disabled = true;
  };

  proto.enable = function () {
    this.$el.toggleClass('scheduler-disabled', false);
    this.options.disabled = false;
  };

  /**
   * 如果无传参，则作为 Getter, 否则为 Setter
   * @param {Array} data optional 选中的内容
   * @return {Array} 返回当前选中的内容
   */
  proto.val = function (data) {
   var temp ;
     // setter
    if (toStr(data) === '[object Object]') {
      // TODO 数据结构校验
      this.data = data;
    
   
      this.update(data);
      
    } else { // getter
      
      return this.merge(this.data, {}, SelectMode.JOIN);
    }
  };

  proto.destroy = function () {
    this.$el.removeClass('scheduler').empty();
  };

  $.extend(Scheduler.DEFAULTS, Scheduler.LOCALES.zh);

  // SCHEDULER PLUGIN DEFINITION
  // ---------------------------

  var apiMethods = [
    'val',
    'destroy',
    'disable',
    'enable'
  ];

  // Set as a jQuery plugin
  $.fn.scheduler = function (option) {
      
     var value;
    var args = Array.prototype.slice.call(arguments, 1);
     if(arguments[1]!==undefined){
          
     }
    this.each(function () {
      var $this = $(this);
      var data = $this.data('scheduler');
   
      var options = $.extend({}, Scheduler.DEFAULTS, $this.data(),typeof option === 'object' && option);
        
      if (typeof option === 'string') {

        if ($.inArray(option, apiMethods) < 0) {
          throw new Error('Unknown method: ' + option);
        }

        if (!data) {
          return;
        }
       

        value = data[option].apply(data, args);
         if (option === 'destroy') {
          $this.removeData('scheduler');
        }
      }
   
      if (!data) {
          
         $this.data('scheduler', (data = new Scheduler(this, options)));

      }
    });
    
    return typeof value === 'undefined' ? this : value;
  };

  // Exports settings
  $.fn.scheduler.defaults = Scheduler.DEFAULTS;
  $.fn.scheduler.templates = Scheduler.TEMPLATES;
  $.fn.scheduler.locales = Scheduler.LOCALES;
  $.fn.scheduler.util = Scheduler.Util;
})(jQuery);
