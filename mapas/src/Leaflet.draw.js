/**
 * Leaflet.draw assumes that you have already included the Leaflet library.
 */
L.drawVersion = '0.4.2';
/**
 * @class L.Draw
 * @aka Draw
 *
 *
 * To add the draw toolbar set the option drawControl: true in the map options.
 *
 * @example
 * ```js
 *      var map = L.map('map', {drawControl: true}).setView([51.505, -0.09], 13);
 *
 *      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 *      }).addTo(map);
 * ```
 *
 * ### Adding the edit toolbar
 * To use the edit toolbar you must initialise the Leaflet.draw control and manually add it to the map.
 *
 * ```js
 *      var map = L.map('map').setView([51.505, -0.09], 13);
 *
 *      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 *      }).addTo(map);
 *
 *      // FeatureGroup is to store editable layers
 *      var drawnItems = new L.FeatureGroup();
 *      map.addLayer(drawnItems);
 *
 *      var drawControl = new L.Control.Draw({
 *          edit: {
 *              featureGroup: drawnItems
 *          }
 *      });
 *      map.addControl(drawControl);
 * ```
 *
 * The key here is the featureGroup option. This tells the plugin which FeatureGroup contains the layers that
 * should be editable. The featureGroup can contain 0 or more features with geometry types Point, LineString, and Polygon.
 * Leaflet.draw does not work with multigeometry features such as MultiPoint, MultiLineString, MultiPolygon,
 * or GeometryCollection. If you need to add multigeometry features to the draw plugin, convert them to a
 * FeatureCollection of non-multigeometries (Points, LineStrings, or Polygons).
 */
L.Draw = {};

/**
 * @class L.drawLocal
 * @aka L.drawLocal
 *
 * The core toolbar class of the API — it is used to create the toolbar ui
 *
 * @example
 * ```js
 *      var modifiedDraw = L.drawLocal.extend({
 *          draw: {
 *              toolbar: {
 *                  buttons: {
 *                      polygon: 'Draw an awesome polygon'
 *                  }
 *              }
 *          }
 *      });
 * ```
 *
 * The default state for the control is the draw toolbar just below the zoom control.
 *  This will allow map users to draw vectors and markers.
 *  **Please note the edit toolbar is not enabled by default.**
 */
L.drawLocal = {
	// format: {
	// 	numeric: {
	// 		delimiters: {
	// 			thousands: ',',
	// 			decimal: '.'
	// 		}
	// 	}
	// },
	draw: {
		toolbar: {
			// #TODO: this should be reorganized where actions are nested in actions
			// ex: actions.undo  or actions.cancel
			actions: {
				title: 'Cancelar desenho',
				text: 'Cancelar'
			},
			finish: {
				title: 'Terminar o desenho',
				text: 'Terminar'
			},
			undo: {
				title: 'Apagar último ponto desenhado',
				text: 'Excluir último ponto'
			},
			buttons: {
				polyline: 'Desenhe uma linha',
				polygon: 'Desenhe um polígono',
				rectangle: 'Desenhe um retângulo',
				circle: 'Desenhar um círculo',
				marker: 'Desenhe um marcador',
				circlemarker: 'Desenhe um marcador de círculo'
			}
		},
		handlers: {
			circle: {
				tooltip: {
					start: 'Clique e arraste para desenhar o círculo.'
				},
				radius: 'Raio'
			},
			circlemarker: {
				tooltip: {
					start: 'Clique no mapa para colocar o marcador do círculo.'
				}
			},
			marker: {
				tooltip: {
					start: 'Clique no mapa para posicionar o marcador.'
				}
			},
			polygon: {
				tooltip: {
					start: 'Clique para começar a desenhar a forma.',
					cont: 'Clique para continuar a desenhar a forma.',
					end: 'Clique no primeiro ponto para fechar esta forma.'
				}
			},
			polyline: {
				error: '<strong>Error:</strong> bordas de forma não podem atravessar!',
				tooltip: {
					start: 'Clique para começar a desenhar linha.',
					cont: 'Clique para continuar a linha',
					end: 'Clique no último ponto para terminar a linha.'
				}
			},
			rectangle: {
				tooltip: {
					start: 'Clique e arraste para desenhar o retângulo.'
				}
			},
			simpleshape: {
				tooltip: {
					end: 'Solte o mouse para finalizar o desenho.'
				}
			}
		}
	},
	edit: {
		toolbar: {
			actions: {
				save: {
					title: 'Salvar alterações',
					text: 'Salvar'
				},
				cancel: {
					title: 'Cancelar a edição, descarta todas as alterações',
					text: 'Cancelar'
				},
				clearAll: {
					title: 'Apaga todos os desenhos',
					text: 'Apagar tudo'
				}
			},
			buttons: {
				edit: 'Editar camadas',
				editDisabled: 'Nenhuma camada para editar',
				remove: 'Excluir camadas',
				removeDisabled: 'Nenhuma camada para excluir'
			}
		},
		handlers: {
			edit: {
				tooltip: {
					text: 'Arraste alças ou marcadores para editar.',
					subtext: 'Clique em salvar após editar .'
				}
			},
			remove: {
				tooltip: {
					text: 'Clique no desenho para remover.'
				}
			}
		}
	}
};
