import { gmhi_model, medians } from "./data.js"

export function plot_hphm(ele, sample) {
  const hp = gmhi_model['health_abundant']
  const hm = gmhi_model['health_scarce']

  const empty = JSON.stringify(sample) === "{}";

  ele.innerHTML = (
  `
  <h2 class="text-center">G️MHI Species</h1>
  <br>
  <table>
    <tbody>
      <tr>
        <th scope="col">Species Name</th>
        <th scope="col">Presence</th>
        <th scope="col">Relative Abundance</th>
        <th scope="col">Median (Healthy)</th>
        <th scope="col">Median (Nonhealthy)</th>
      </tr>
      ${get_rows(hp, sample, "green", empty)}
      ${get_rows(hm, sample, "#a00", empty)}
    </tbody>
  </table>`
  );

  const num_hp = Object.keys(sample).filter(ele => hp.has(ele)).length;
  const num_hm = Object.keys(sample).filter(ele => hm.has(ele)).length;
  let caption = `<br/><b>GMHI Species. </b> Presence/absence of health prevalent (green) and health scarce (red) species.`
  if (!empty) {
    caption += ` The input sample has ${num_hp} out of 7 health prevalent and ${num_hm} out of 43 health scarce species.`
  }
  ele.innerHTML += caption;

}

const get_rows = (features, sample, color, empty) => Array.from(features).map(s => (
    `<tr>
      <th scope="row" style="color: ${color};"><i>${s.split("s__")[1].replace("_", " ")}</i></th>
      <td>${empty ? "-" : (s in sample ? "✅" : "❌")}</td>
      <td>${empty ? "-" : (s in sample ? ra_to_perc(sample[s]) : "-")}</td>
      <td>${ra_to_perc(medians[s]['h'])}</td>
      <td>${ra_to_perc(medians[s]['n'])}</td>
    </tr>`
    )).join("")

const ra_to_perc = (ra) => (ra * 100).toFixed(3) + "%" 