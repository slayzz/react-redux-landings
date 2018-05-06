/* eslint-disable */

/**
 *  Пример добавления формы
 *
 *  Создание объекта формы (2 полевая - FORM_2_P или 4 полевая FORM_4_P):
 *
 *  var registrationModel2P = new RegistrationModel(RegistrationModel.FORM_2_P);
 *
 *  Обработчик ошибок:
 *
 *      registrationModel2P.setErrorHandler(function (errors) {
 *          console.log(errors);
 *      });
 *
 *  Добавление отслеживаемых полей и установка параметров:
 *
 *      registrationModel2P
 *          .addEmailInput('.register-block .login')
 *          .addPasswordInput('.register-block .pass')
 *          .setRules(true)
 *          .addCurrencyInput('input[name="register-currency"]');
 *
 *  Добавление поведения после регистрации (по умолчанию редирект на 'https://olymptrade.com/platform/tutorial')
 *
 *      registrationModel2P.setBehaviorAfterRegistration(function(){
 *          Ваш обработчик
 *      });
 *
 *  Отправка формы:
 *
 *      $('.register-block').on('submit', function (event) {
 *          event.preventDefault();
 *          registrationModel2P.execute();
 *      });
 *
 *  Синхронизация форм:
 *
 *      Создание модели синхронизациии
 *
 *      var registrationModelsSynchronization = new RegistrationModelsSynchronization();
 *      registrationModelsSynchronization.addForm(registrationModel2P);
 *      registrationModelsSynchronization.addForm(registrationModel2P2);
 *      registrationModelsSynchronization.addForm(registrationModel4P);
 */

/**
 * Вспомогательные функции
 * @type {{isFunction: utils.isFunction, trim: utils.trim}}
 */
const utils = {
  /**
   *
   * @param functionToCheck
   * @returns {*|boolean}
   */
  isFunction: function(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  },
  /**
   *
   * @param str
   * @param char
   * @returns {string|XML|void}
   */
  trim: function(str, char) {
    char = char || '\\s+';
    return str.replace(new RegExp('^' + char + '|' + char + '$', 'g'), '');
  },
  /**
   *
   * @param selector
   * @returns {*}
   */
  findElement: function(selector) {
    if (selector === undefined) {
      throw 'Не передан селектор';
    }
    var element;
    if (!(element = document.querySelector(selector))) {
      throw new Error('Элемент с селектором "' + selector + '" не нейден');
    }
    return element;
  },
  /**
   *
   * @param selector
   * @returns {NodeList}
   */
  findElements: function(selector) {
    if (selector === undefined) {
      throw new Error('Не передан селектор');
    }
    var elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      throw new Error('Элементы с селектором "' + selector + '" не нейдены');
    }
    return elements;
  },
  /**
   * JSONP запрос
   * @param url
   * @param key
   * @param callback
   */
  jsonp: function(url, key, callback) {
    var doc = document,
      head = doc.head,
      script = doc.createElement('script'),
      callbackName = 'f' + Math.round(Math.random() * Date.now());
    script.setAttribute('src', url + (url.indexOf('?') > 0 ? '&' : '?') + key + '=' + callbackName);
    window[callbackName] = function(json) {
      window[callbackName] = undefined;
      setTimeout(function() {
        head.removeChild(script);
      }, 0);
      callback(json);
    };
    head.appendChild(script);
  },
  /**
   * Создание query string из одномерго объекта
   * @param object
   * @returns {string}
   */
  serialize: function(object) {
    var tmp = [];
    for (var p in object)
      if (object.hasOwnProperty(p)) {
        tmp.push(encodeURIComponent(p) + '=' + encodeURIComponent(object[p]));
      }
    return tmp.join('&');
  },
  getLocale: function() {
    var defaultLocale = 'en';
    var locale = null;

    if (typeof window !== 'undefined' && navigator.languages && navigator.languages.length) {
      locale = navigator.languages[0];
    } else if (typeof window !== 'undefined' && navigator.userLanguage) {
      locale = navigator.userLanguage;
    } else {
      locale = typeof window !== 'undefined' ? navigator.language : null;
    }

    if (locale === null) {
      locale = defaultLocale;
    } else if (locale.length > 2) {
      locale = locale.substring(0, 2);
    }
    return locale;
  },
};

/**
 *  Перевод
 * @param texts
 * @constructor
 */
var Translation = function(texts) {
  var _self = this;
  _self._store = texts || {};
  _self.get = function get(key, text) {
    var def = text && text.length ? text : key;
    return typeof _self._store[key] != 'undefined' ? _self._store[key] : def;
  };

  _self.all = function all() {
    return _self._store;
  };
};
/**
 * Миксин событий
 * @type {{on: eventMixin.on, off: eventMixin.off, trigger: eventMixin.trigger}}
 */
var eventMixin = {
  /**
   * Подписка на событие
   * Использование:
   *  menu.on('select', function(item) { ... }
   */
  on: function(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Прекращение подписки
   *  menu.off('select',  handler)
   */
  off: function(eventName, handler) {
    var handlers = this._eventHandlers && this._eventHandlers[eventName];
    if (!handlers) return;
    for (var i = 0; i < handlers.length; i++) {
      if (handlers[i] == handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Генерация события с передачей данных
   *  this.trigger('select', item);
   */
  trigger: function(eventName) {
    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return; // обработчиков для события нет
    }

    // вызвать обработчики
    var handlers = this._eventHandlers[eventName];
    for (var i = 0; i < handlers.length; i++) {
      handlers[i].apply(this, [].slice.call(arguments, 1));
    }
  },
};

/**
 * Билдер свойст рег формы
 * @constructor
 */

var ValueBuilder = function(typeForm, typeProject) {
  //Приватные свойства билдера
  this._language = 'ru';
  this._email = '';
  this._password = '';
  this._name = '';
  this._surname = '';
  this._phone = '';
  this._currency = '';
  this._timezone = new Date().getTimezoneOffset() / 60 * -1;
  this._rules = false;
  if (typeProject === RegistrationModel.PROJECT_FX) {
    this._project = 'FX';
  }
  this._additionalFields = {};

  //DOM элементы
  this._emailDOM = null;
  this._passwordDOM = null;
  this._nameDOM = null;
  this._surnameDOM = null;
  this._phoneDOM = null;
  this._currencyDOM = null;
  this._rulesDOM = null;
};

/**
 * Простой обработчик input
 * @param selector селектор CSS
 * @param property свойство класса
 * @return this
 */
function simpleInputHandler(selector, property) {
  var element = utils.findElement(selector);
  this[property + 'DOM'] = element;
  var _self = this;
  element.addEventListener('input', function() {
    _self[property] = utils.trim(this.value);
    _self.trigger('change', _self);
  });
}

ValueBuilder.prototype.addEmailInput = function(selector) {
  simpleInputHandler.call(this, selector, '_email');
  return this;
};

ValueBuilder.prototype.addPasswordInput = function(selector) {
  simpleInputHandler.call(this, selector, '_password');
  return this;
};

ValueBuilder.prototype.addNameInput = function(selector) {
  simpleInputHandler.call(this, selector, '_name');
  return this;
};

ValueBuilder.prototype.addSurnameInput = function(selector) {
  simpleInputHandler.call(this, selector, '_surname');
  return this;
};

ValueBuilder.prototype.addPhoneInput = function(selector) {
  simpleInputHandler.call(this, selector, '_phone');
  return this;
};

ValueBuilder.prototype.addCurrencyInput = function(selector) {
  var elements = utils.findElements(selector);
  this['_currencyDOM'] = elements;
  var _self = this;
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      _self._currency = elements[i].value.toLowerCase();
    }
    elements[i].addEventListener('change', function() {
      _self._currency = this.value.toLowerCase();
      _self.trigger('change', _self);
    });
  }
  return this;
};

ValueBuilder.prototype.addRulesInput = function(selector) {
  var element = utils.findElement(selector);
  this['_rulesDOM'] = element;
  this._rules = element.checked;
  var _self = this;
  element.addEventListener('change', function() {
    _self._rules = this.checked;
    _self.trigger('change', _self);
  });
  return this;
};

/**
 * Сеттер свойств Модели и значений DOM
 */

function simpleSetDOM(property, value) {
  if (this[property + 'DOM'] === null) {
    return this;
  }
  this[property] = value;
  this[property + 'DOM'].value = value;
  return this;
}

ValueBuilder.prototype.setEmailDOM = function(value) {
  return simpleSetDOM.call(this, '_email', value);
};

ValueBuilder.prototype.setPasswordDOM = function(value) {
  return simpleSetDOM.call(this, '_password', value);
};

ValueBuilder.prototype.setNameDOM = function(value) {
  return simpleSetDOM.call(this, '_name', value);
};

ValueBuilder.prototype.setSurnameDOM = function(value) {
  return simpleSetDOM.call(this, '_surname', value);
};

ValueBuilder.prototype.setPhoneDOM = function(value) {
  return simpleSetDOM.call(this, '_phone', value);
};

ValueBuilder.prototype.setCurrencyDOM = function(value) {
  if (this._currencyDOM === null) {
    return this;
  }
  if (value !== undefined && ['usd', 'rub', 'eur', 'brl'].indexOf(value) !== -1) {
    for (var i = 0; i < this._currencyDOM.length; i++) {
      this._currencyDOM[i].checked = false;
      if (this._currencyDOM[i].value === value) {
        this._currency = value;
        this._currencyDOM[i].checked = true;
      }
    }
  } else {
    throw new Error('Передано неверное значение валюты');
  }
  return this;
};

ValueBuilder.prototype.setRulesDOM = function(value) {
  if (this._rulesDOM === null) {
    return this;
  }
  if (typeof value === 'boolean') {
    this._rules = value;
    this._rulesDOM.checked = value;
  } else {
    throw new Error('Согласие должно быть boolean');
  }
  return this;
};

/**
 * Сеттер свойств объекта
 * @param value значение
 * @param property свойство класса
 * @param fieldName имя поля
 */
function simpleSetter(value, property, fieldName) {
  if (value === undefined || value.length === 0) {
    throw new Error('Передан пустой аргумент для поля: ' + fieldName);
  } else {
    this[property] = value;
  }
}

ValueBuilder.prototype.setLanguage = function(value) {
  simpleSetter.call(this, value, '_language', 'язык');
  return this;
};

ValueBuilder.prototype.setEmail = function(value) {
  simpleSetter.call(this, value, '_email', 'email');
  return this;
};

ValueBuilder.prototype.setPassword = function(value) {
  simpleSetter.call(this, value, '_password', 'пароль');
  return this;
};

ValueBuilder.prototype.setName = function(value) {
  simpleSetter.call(this, value, '_name', 'имя');
  return this;
};

ValueBuilder.prototype.setSurname = function(value) {
  simpleSetter.call(this, value, '_surname', 'фамилия');
  return this;
};

ValueBuilder.prototype.setPhone = function(value) {
  simpleSetter.call(this, value, '_phone', 'телефон');
  return this;
};

ValueBuilder.prototype.setCurrency = function(value) {
  if (value !== undefined && ['usd', 'rub', 'eur', 'brl'].indexOf(value) !== -1) {
    this._currency = value;
  } else {
    throw new Error('Передано неверное значение валюты');
  }
  return this;
};

ValueBuilder.prototype.setRules = function(value) {
  if (typeof value === 'boolean') {
    this._rules = value;
  } else {
    throw new Error('Согласие должно быть boolean');
  }
  return this;
};

var forbiddenFields = [
  'language',
  'email',
  'password',
  'name',
  'surname',
  'phone',
  'currency',
  'timezone',
  'rules',
  'project',
];

/**
 * Добавление дополнительного неотслеживаемого поля
 * @param key
 * @param value
 */
ValueBuilder.prototype.addAdditionalField = function(key, value) {
  if (forbiddenFields.indexOf(key) !== -1) {
    throw new Error('Поле "' + key + '" уже существует');
  }
  this._additionalFields[key] = value;
  return this;
};
/**
 * Основной класс для работы с регистрацией пользователей
 * @param typeForm тип формы  (RegistrationModel.FORM_2_P - 2 полевая, RegistrationModel.FORM_4_P - 4 полевая)
 * @constructor
 */
var id = 1;
export const RegistrationModel = function(typeForm, typeProject) {
  if (typeForm === undefined) {
    throw new Error('Не передан тип формы');
  }

  if ([RegistrationModel.FORM_2_P, RegistrationModel.FORM_4_P].indexOf(typeForm) === -1) {
    throw new Error('Неверный формат формы: ' + typeForm);
  }

  typeProject = typeProject || RegistrationModel.PROJECT_BO;
  if ([RegistrationModel.PROJECT_BO, RegistrationModel.PROJECT_FX].indexOf(typeProject) === -1) {
    throw new Error('Неверное имя проекта: ' + typeProject);
  }

  ValueBuilder.call(this, typeForm, typeProject);

  if (typeForm === RegistrationModel.FORM_2_P) {
    this._linkToRegistration = 'https://olymptrade.com/user/registration-min';
  } else if (typeForm === RegistrationModel.FORM_4_P) {
    this._linkToRegistration = 'https://olymptrade.com/user/registration';
  }

  this._id = id++;
  this._typeForm = typeForm;

  /**
   * Поведение после регистрации по умолчанию
   * @private
   */
  this._behaviorAfterRegistration = function(result) {
    if (typeProject === RegistrationModel.PROJECT_BO) {
      window.top.location.href = 'https://olymptrade.com/platform/tutorial';
    } else if (typeProject === RegistrationModel.PROJECT_FX) {
      window.top.location.href = 'https://forex.olymptrade.com/platform';
    }
  };

  /**
   * Добавление поведения после регистрации
   * @param callback
   * @public
   */
  this.setBehaviorAfterRegistration = function(callback) {
    if (callback === undefined || !utils.isFunction(callback)) {
      throw new Error('Аргумент не функция');
    } else {
      this._behaviorAfterRegistration = callback;
    }
  };

  /**
   * Обрабочтик ошибок
   * @param errors
   * @private
   */
  this._errorHandler = function(errors) {
    alert(errors);
  };

  /**
   * Добавление кастомного обрабочтика ошибок
   * @param callback
   * @public
   */
  this.setErrorHandler = function(callback) {
    if (callback === undefined || !utils.isFunction(callback)) {
      throw new Error('Аргумент не функция');
    } else {
      this._errorHandler = callback;
    }
  };

  /**
   * Регистрация
   * @public
   */
  this.execute = function() {
    if (this._typeForm === RegistrationModel.FORM_2_P) {
      this._executeForm2p();
    } else if (this._typeForm === RegistrationModel.FORM_4_P) {
      this._executeForm4p();
    }
  };

  this._bindAdditionalFields = function(additionalFields, params) {
    var additionalFieldKeys = Object.keys(this._additionalFields);
    if (additionalFieldKeys.length !== 0) {
      additionalFieldKeys.forEach(function(value) {
        params[value] = additionalFields[value];
      });
    }
    return params;
  };

  /**
   * Регистрация для 2 полевой формы
   * @private
   */
  this._executeForm2p = function() {
    if (!this._rules) {
      this._errorHandler(RegistrationModel.TRANS.get('accept_rules_required'));
      return;
    } else if (!this._email.length || !this._password.length) {
      this._errorHandler(RegistrationModel.TRANS.get('empty_fields'));
      return;
    }

    var params = {
      email: this._email,
      password: this._password,
      currency: this._currency,
      timezone: this._timezone,
    };

    if (this._project) {
      params.project = this._project;
    }
    params = this._bindAdditionalFields(this._additionalFields, params);
    var _self = this;
    utils.jsonp(this._linkToRegistration + '?' + utils.serialize(params), 'jsonp_callback', function(json) {
      if (json.result === true) {
        _self._behaviorAfterRegistration(json);
      } else {
        _self._errorHandler(json.error);
      }
    });
  };

  /**
   * Регистрация для 4 полевой формы
   * @private
   */
  this._executeForm4p = function() {
    if (!this._rules) {
      this._errorHandler(RegistrationModel.TRANS.get('accept_rules_required'));
      return;
    } else if (!this._email.length || !this._password.length || !this._name.length || !this._phone.length) {
      this._errorHandler(RegistrationModel.TRANS.get('empty_fields'));
      return;
    }

    var params = {
      email: this._email,
      password: this._password,
      language: this._language,
      currency: this._currency,
      name: this._name,
      surname: this._surname,
      phone: this._phone,
      timezone: this._timezone,
    };

    if (this._project) {
      params.project = this._project;
    }
    params = this._bindAdditionalFields(this._additionalFields, params);
    var _self = this;
    utils.jsonp(this._linkToRegistration + '?' + utils.serialize(params), 'jsonp_callback', function(json) {
      if (json.result === true) {
        _self._behaviorAfterRegistration(json);
      } else {
        _self._errorHandler(json.error);
      }
    });
  };
};

/**
 * Контстанты класса
 */
Object.defineProperty(RegistrationModel, 'FORM_2_P', { value: 'FORM_2_P', writable: false });
Object.defineProperty(RegistrationModel, 'FORM_4_P', { value: 'FORM_4_P', writable: false });
Object.defineProperty(RegistrationModel, 'PROJECT_BO', { value: 'PROJECT_BO', writable: false });
Object.defineProperty(RegistrationModel, 'PROJECT_FX', { value: 'PROJECT_FX', writable: false });

/**
 * Переводы ошибок
 */
var translates = {
  empty_field: {
    en: 'The field should not be empty',
    ru: 'Поле не должно быть пустым',
    pt: 'Esse campo não deve ficar em branco',
    es: 'Este campo no puede quedar vacío',
    th: 'ช่องไม่สมควรว่างเปล่า',
    id: 'Bidang tidak boleh kosong',
    ms: '',
    tr: 'Alan boş bırakılmamalı',
  },
  empty_fields: {
    en: 'Please fill in all the fields',
    ru: 'Пожалуйста, заполните все поля',
    pt: 'Por favor, preencha todos os campos',
    es: 'Por favor, complete todos los campos',
    th: 'กรุณา ใส่ข้อมูลในช่องทั้งหมด',
    id: 'Silahkan isi semua pertanyaan',
    ms: '',
    tr: 'Lütfen, tüm alanları doldurunuz',
  },
  accept_rules_required: {
    en: 'To continue, you have to agree to the rules',
    ru: 'Для продолжения необходимо согласиться с правилами',
    pt: 'Você tem que aceitar os termos para continuar',
    es: 'Debe aceptar los términos para continuar',
    th: 'คุณจำเป็นต้องยอมรับเงื่อนไขเพื่อดำเนินการต่อ',
    id: 'Anda harus menyetujui persyaratan untuk melanjutkan',
    ms: '',
    tr: 'Devam etmek için şartları kabul etmelisin',
  },
  register_success: {
    en: 'Congratulations! You have successfully completed registration',
    ru: 'Поздравляем! Вы успешно зарегистрированы.',
    pt: 'Parabéns! Você completou o registro com sucesso.',
    es: '¡Felicitaciones! Ha completado la inscripción exitosamente',
    th: 'ยินดีด้วย! คุณทำการลงทะเบียนเสร็จสมบูรณ์',
    id: 'Selamat! Anda berhasil menyelesaikan pendaftaran',
    ms: '',
    tr: 'Tebrikler! Kayıt işlemini başarıyla tamamladınız',
  },
  plain_preloader_text: {
    en: 'Wait a few seconds',
    ru: 'Подождите несколько секунд',
    pt: 'Espere alguns segundos',
    es: 'Espere unos segundos',
    th: 'กรุณาคอยสักสองสามวินาที',
    id: 'Silahkan menunggu beberapa detik',
    ms: '',
    tr: 'Lütfen birkaç saniye bekleyin',
  },
  start_of_deal: {
    en: 'Trade<br> start',
    ru: 'Начало<br> сделки',
    pt: 'Início da<br> transação',
    es: '',
    th: 'เริ่่มการซื้อขาย',
    id: 'Mulai<br> transaksi',
    ms: '',
    tr: 'İşlem<br>başlangıcı',
  },
  end_of_deal: {
    en: 'End of<br> trade',
    ru: 'Конец<br> сделки',
    pt: 'Fim da<br> transação',
    es: '',
    th: 'การซื้อขายสิ้นสุดลง',
    id: 'Akhir<br> transaksi',
    ms: '',
    tr: 'İşlem <br> bitişi',
  },
  time: {
    en: 'Time',
    ru: 'Время',
    pt: 'Tempo',
    es: 'Tiempo',
    th: 'เวลา',
    id: 'Waktu',
    ms: '',
    tr: 'Zaman',
  },
  curs: {
    en: 'Exchange Rate',
    ru: 'Курс',
    pt: 'Câmbio',
    es: 'Tasa',
    th: 'อัตรา',
    id: 'Nilai',
    ms: '',
    tr: 'Oran',
  },
};
var userLocale = utils.getLocale();
var resultTranslate = {};
for (var key in translates) {
  var translate = translates[key];
  if (translate[userLocale]) {
    resultTranslate[key] = translate[userLocale];
  } else {
    resultTranslate[key] = translate['en'];
  }
}

Object.defineProperty(RegistrationModel, 'TRANS', {
  value: new Translation(resultTranslate),
  writable: false,
});

//Прототипное наследование
RegistrationModel.prototype = Object.create(ValueBuilder.prototype);

//Добавление событийной примеси
for (var key in eventMixin) {
  RegistrationModel.prototype[key] = eventMixin[key];
}

/**
 * Менеджер синхронизации формы
 **/
var RegistrationModelsSynchronization = function() {
  this._models = [];
};

RegistrationModelsSynchronization.prototype.addForm = function(form) {
  if (!(form instanceof RegistrationModel)) {
    throw new Error('Переданная форма не является объектом RegistrationModel');
  }
  this._models.push(form);
  var _self = this;
  form.on('change', function(form) {
    for (var i = 0; i < _self._models.length; i++) {
      if (_self._models[i]._id !== form._id) {
        _self._models[i]
          .setEmailDOM(form._email)
          .setPasswordDOM(form._password)
          .setNameDOM(form._name)
          .setSurnameDOM(form._surname)
          .setPhoneDOM(form._phone)
          .setCurrencyDOM(form._currency)
          .setRulesDOM(form._rules);
      }
    }
  });
};
