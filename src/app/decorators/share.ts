export class Store {
	private static _store: IShareableInstance[] = [];

	public static add(name: string | symbol, initialValue?: any): Shareable {
		const shareableInstance = this._store.find(shareableInstance => shareableInstance.name === name);
		if (shareableInstance) {
			return shareableInstance.instance;
		}

		const newShareableInstance = {
			name,
			instance: new Shareable(initialValue)
		}

		this._store.push(newShareableInstance);
		return newShareableInstance.instance;
	}

	public static remove(name: string | symbol) {
		const index = this._store.findIndex(shareableInstance => shareableInstance.name === name);
		if (index === -1) {
			return;
		}

		this._store.splice(index, 1);
	}

	public static getInstance(name: string | symbol): IShareableInstance | undefined {
		return this._store.find(shareableInstance => shareableInstance.name === name);
	}
}

export interface IShareableInstance {
	name: string | symbol;
	instance: Shareable;
}

export class Shareable {
	private _value: any;

	get value(): any {
		return this._value;
	}

	set value(newValue: any) {
		this._value = newValue;
	}

	constructor(value: any) {
		this._value = value;
	}
}

export function Share<T extends object, K extends keyof T>(
	bindingPropertyName: string,
	...args: any[]
): PropertyDecorator {
	return (target, key) => {
		const instance = Store.add(bindingPropertyName);

		Object.defineProperty(target, key, {
			get(): T[K] {
				return instance.value;
			},

			set(this: T, initialValue: T[K]) {
				if (initialValue) {
					instance.value = initialValue;
				}

				Object.defineProperty(this, key, {
					get(): T[K] {
						return instance.value;
					},

					set(this: T, value: T[K]) {
						instance.value = value;
					}
				});
			}
		});
	}
}



